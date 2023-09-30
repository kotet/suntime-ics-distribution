import argparse
import sys
from typing import List

# parse arguments
parser = argparse.ArgumentParser()
# input file
parser.add_argument("-i", "--input", help="input file", required=True)
# output file
parser.add_argument("-o", "--output", help="output file", default="-")

args = parser.parse_args()

if args.output != "-":
    print("output file: {}".format(args.output), file=sys.stderr)
    sys.stdout = open(args.output, "w")

print("[")

entries: List[str] = []

# read input file (tsv)
# country_code	name_jp	name_jps	capital_jp	name_en	name_ens	capital_en	lat	lon
with open(args.input, "r") as f:
    # skip first line
    f.readline()
    for line in f:
        line = line.rstrip()
        data = line.split("\t")
        country_code = data[0]
        name_jp = data[1]
        name_jps = data[2]
        capital_jp = data[3]
        name_en = data[4]
        name_ens = data[5]
        capital_en = data[6]
        lat = data[7]
        lon = data[8]
        entry = "{"
        entry += "\"country_code\": \"{}\", ".format(country_code)
        entry += "\"name_jp\": \"{}\", ".format(name_jp)
        # entry += "\"name_jps\": \"{}\", ".format(name_jps)
        entry += "\"capital_jp\": \"{}\", ".format(capital_jp)
        entry += "\"name_en\": \"{}\", ".format(name_en)
        # entry += "\"name_ens\": \"{}\", ".format(name_ens)
        entry += "\"capital_en\": \"{}\", ".format(capital_en)
        entry += "\"lat\": {}, ".format(lat)
        entry += "\"lon\": {}".format(lon)
        entry += "}"
        entries.append(entry)
    print(",\n".join(entries))
print("]")
