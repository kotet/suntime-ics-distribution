from typing import List, Tuple
import argparse
import sys
import csv

import shapefile

# parse arguments
parser = argparse.ArgumentParser()
# input file (https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-P28-v2_0.html)
parser.add_argument("-i", "--input", help="input file", required=True)
# output file
parser.add_argument("-o", "--output", help="output file", default="-")
# prefecture list file
parser.add_argument(
    "-p", "--prefecture",
    help="prefecture list file",
    default="data_persistent/prefectures.csv"
)

args = parser.parse_args()

if args.output != "-":
    print("output file: {}".format(args.output), file=sys.stderr)
    sys.stdout = open(args.output, "w")

# code,name_jp,sname_jp,name_en,sname_en
prefectures: List[Tuple[int, str,str,str,str]] = []
with open(args.prefecture, "r") as f:
    f.readline()
    reader = csv.reader(f)
    for row in reader:
        prefectures.append((int(row[0]), row[1], row[2], row[3], row[4]))

def searchPrefByName(name: str) -> Tuple[int, str,str,str,str]:
    for pref in prefectures:
        if pref[2] in name:
            return pref
    return None

f = shapefile.Reader(args.input, encoding="cp932")

print("[")
entries = []

for i, (shp, rec) in enumerate(zip(f.shapes(), f.records())):
    # 12001: 都道府県庁
    # 12005: 都道府県の出先機関
    if (rec["P28_002"] == "12001" or rec["P28_002"] == "12005"):
      if any(s in rec["P28_003"] for s in ["県庁", "府庁", "道庁", "都庁"]):
          pref = searchPrefByName(rec["P28_003"])
          entry = "{"
          entry += "\"prefcode\": \"{:02d}\",".format(pref[0])
          entry += "\"prefname_jp\": \"{}\",".format(pref[1])
          entry += "\"prefname_sjp\": \"{}\",".format(pref[2])
          entry += "\"prefname_en\": \"{}\",".format(pref[3])
          entry += "\"prefname_sen\": \"{}\",".format(pref[4])
          entry += "\"capital_jp\": \"{}\",".format(rec["P28_003"])
          entry += "\"capital_address\": \"{}\",".format(rec["P28_004"])
          entry += "\"capital_lat\": \"{}\",".format(shp.points[0][1])
          entry += "\"capital_lon\": \"{}\"".format(shp.points[0][0])
          entry += "}"
          entries.append(entry)

assert len(entries) == 47

print(",\n".join(entries))
print("]")
