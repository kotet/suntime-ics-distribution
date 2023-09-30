from typing import List, Tuple
import argparse
import sys
import csv
import re
from typing import Optional, NamedTuple
from dataclasses import dataclass

from pdfminer.high_level import extract_text

class PrefInfo(NamedTuple):
    code: int
    name_jp: str
    sname_jp: str
    name_en: str
    sname_en: str

@dataclass
class JsonEntry:
    pref_name: str
    capital_name: str
    lat: float
    lon: float
    pref_data: PrefInfo
    def __str__(self) -> str:
        return (
        "{"
        + f"\"prefcode\": \"{self.pref_data.code}\","
        + f"\"name_jp\": \"{self.pref_data.name_jp}\","
        + f"\"capital_name\": \"{self.capital_name}\","
        + f"\"name_en\": \"{self.pref_data.name_en}\","
        + f"\"sname_jp\": \"{self.pref_data.sname_jp}\","
        + f"\"sname_en\": \"{self.pref_data.sname_en}\","
        + f"\"capital_lat\": {self.lat},"
        + f"\"capital_lon\": {self.lon}"
        + "}"
        )

# parse arguments
parser = argparse.ArgumentParser()
# input file (https://www.gsi.go.jp/KOKUJYOHO/center.htm)
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
prefectures: List[PrefInfo] = []
with open(args.prefecture, "r") as f:
    f.readline()
    reader = csv.reader(f)
    for row in reader:
        prefectures.append(PrefInfo(
            code=int(row[0]),
            name_jp=row[1],
            sname_jp=row[2],
            name_en=row[3],
            sname_en=row[4]
        ))

def searchPrefByName(name: str) -> PrefInfo:
    for pref in prefectures:
        if pref[2] in name:
            return pref
    return None

# 都道府県の庁舎及び東西南北端点の経緯度(世界測地系）
#
# 各端点等をクリックすると、「地理院地図」で該当場所の地図が表示されます。
#
# 北海道
#
# 北海道庁
#
# 東端
#
# 西端
#
# 南端
#
# 北端
#
# 経度 141°20′49″ 148°53′35″ 139°20′02″ 139°47′58″ 148°45′08″
# 緯度 43°03′52″ 45°30′22″ 41°30′53″ 41°21′06″ 45°33′26″

def parseCoord(line: str) -> float:
    deg,min,sec,_ = re.split("[°′″]", line)
    return float(deg) + float(min)/60 + float(sec)/3600

text = extract_text(args.input)
stream = text.split("\n")

# skip first 3 lines
stream = stream[3:]

entries: List[JsonEntry] = []

while len(stream) > 0:
    pref_name: Optional[str] = None
    while (pref_name is None) and (len(stream) > 0):
        line = stream.pop(0)
        if any([(s in line) for s in ["都", "道", "府", "県"]]):
            pref_name = line.strip()
    if pref_name is None:
        break

    capital_name: Optional[str] = None
    while (capital_name is None) and (len(stream) > 0):
        line = stream.pop(0)
        if pref_name in line:
            capital_name = line.strip()
    assert capital_name is not None

    latline: Optional[str] = None
    lonline: Optional[str] = None

    while (lonline is None) and (len(stream) > 0):
        line = stream.pop(0)
        if "経度" in line:
            lonline = line.strip()
    assert lonline is not None

    while (latline is None) and (len(stream) > 0):
        line = stream.pop(0)
        if "緯度" in line:
            latline = line.strip()
    assert latline is not None

    lat = latline.split(" ")[1]
    lon = lonline.split(" ")[1]

    entries.append(JsonEntry(
        pref_name=pref_name,
        capital_name=capital_name,
        lat=parseCoord(lat),
        lon=parseCoord(lon),
        pref_data=searchPrefByName(pref_name)
    ))

print("[")
print(",\n".join([str(e) for e in entries]))
print("]")
