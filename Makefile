ALL_ICS :=
ifneq ($(MAKECMDGOALS),clean-dist)
include data/world.Makefile
include data/japan.Makefile
endif

INITPYTHON_GEN := . ./suntime-ics-generator/.venv/bin/activate
INITPYTHON_SCRIPTS := . ./scripts/.venv/bin/activate
POETRYDEPS := suntime-ics-generator/.venv/bin/activate scripts/.venv/bin/activate

GENERATEOPTIONS := --start-date-offset -300 --end-date-offset 600 --disable-alarm

ifeq (,$(wildcard P28-22.zip))
P2822_AVAILABLE := 0
else
P2822_AVAILABLE := 1
endif

all: $(ALL_ICS) website/public/data/ics/ website/public/data/json/
	cd website && yarn && yarn build

lint: scripts/generate_world.json.py scripts/generate_japan.json.py ${POETRYDEPS}
	${INITPYTHON_SCRIPTS} \
	&& ruff check $$(ls scripts/*.py) \
	&& mypy $$(ls scripts/*.py)

website/public/data/ics/: $(ALL_ICS)
	mkdir -p ${@D}
	cp -R data/ics/* $@/
website/public/data/json/: data/json/world.json data/json/japan.json
	mkdir -p ${@D}
	cp -R data/json/* $@/

./suntime-ics-generator/pyproject.toml:
	git submodule update --init --recursive suntime-ics-generator

suntime-ics-generator/.venv/bin/activate: ./suntime-ics-generator/pyproject.toml
	uv --project ./suntime-ics-generator sync

scripts/.venv/bin/activate: ./scripts/pyproject.toml
	uv --project ./scripts sync

# world
data/world.Makefile: data/json/world.json
	cat data/json/world.json | jq '.[] | .country_code' | sort | tr '[A-Z]' '[a-z]' | xargs -I{} echo "ALL_ICS += data/ics/world/sunrise-sunset/{}-sunrise-sunset.ics" > $@
	cat data/json/world.json | jq '.[] | .country_code' | sort | tr '[A-Z]' '[a-z]' | xargs -I{} echo "ALL_ICS += data/ics/world/sunrise/{}-sunrise.ics" >> $@
	cat data/json/world.json | jq '.[] | .country_code' | sort | tr '[A-Z]' '[a-z]' | xargs -I{} echo "ALL_ICS += data/ics/world/sunset/{}-sunset.ics" >> $@

data/r0411world_utf8.csv: asti-datr0411wc.zip
	unzip -o -d data $< | grep "inflating:" | awk '{print $$2}' | xargs -I{} touch {}

data/json/world.json: data/r0411world_utf8.csv scripts/generate_world.json.py ${POETRYDEPS}
	mkdir -p ${@D}
	${INITPYTHON_SCRIPTS} \
	&& python scripts/generate_world.json.py -i $< -o $@

data/ics/world/sunrise-sunset/%-sunrise-sunset.ics: data/json/world.json ${POETRYDEPS}
	@echo "Generating $@"
	@mkdir -p "${@D}"
	@${INITPYTHON_GEN} && \
	python suntime-ics-generator/generate-calendar.py \
	--lat `cat data/json/world.json | jq -r '.[] | select(.country_code == "$(shell echo $* | tr '[a-z]' '[A-Z]')") | .lat'` \
	--lon `cat data/json/world.json | jq -r '.[] | select(.country_code == "$(shell echo $* | tr '[a-z]' '[A-Z]')") | .lon'` \
	--output $@ ${GENERATEOPTIONS} 2> /dev/null

data/ics/world/sunrise/%-sunrise.ics: data/json/world.json ${POETRYDEPS}
	@echo "Generating $@"
	@mkdir -p "${@D}"
	@${INITPYTHON_GEN} && \
	python suntime-ics-generator/generate-calendar.py \
	--lat `cat data/json/world.json | jq -r '.[] | select(.country_code == "$(shell echo $* | tr '[a-z]' '[A-Z]')") | .lat'` \
	--lon `cat data/json/world.json | jq -r '.[] | select(.country_code == "$(shell echo $* | tr '[a-z]' '[A-Z]')") | .lon'` \
	--output $@ --disable-sunset ${GENERATEOPTIONS} 2> /dev/null

data/ics/world/sunset/%-sunset.ics: data/json/world.json ${POETRYDEPS}
	@echo "Generating $@"
	@mkdir -p "${@D}"
	@${INITPYTHON_GEN} && \
	python suntime-ics-generator/generate-calendar.py \
	--lat `cat data/json/world.json | jq -r '.[] | select(.country_code == "$(shell echo $* | tr '[a-z]' '[A-Z]')") | .lat'` \
	--lon `cat data/json/world.json | jq -r '.[] | select(.country_code == "$(shell echo $* | tr '[a-z]' '[A-Z]')") | .lon'` \
	--output $@ --disable-sunrise ${GENERATEOPTIONS} 2> /dev/null

# japan
data/japan.Makefile: data/json/japan.json
	cat data/json/japan.json | jq '.[] | .prefcode' | sort | tr '[A-Z]' '[a-z]' | xargs -I{} echo "ALL_ICS += data/ics/japan/sunrise-sunset/{}-sunrise-sunset.ics" > $@
	cat data/json/japan.json | jq '.[] | .prefcode' | sort | tr '[A-Z]' '[a-z]' | xargs -I{} echo "ALL_ICS += data/ics/japan/sunrise/{}-sunrise.ics" >> $@
	cat data/json/japan.json | jq '.[] | .prefcode' | sort | tr '[A-Z]' '[a-z]' | xargs -I{} echo "ALL_ICS += data/ics/japan/sunset/{}-sunset.ics" >> $@

data/P28-22.shp: P28-22.zip
	unzip -o -d data $< | grep "inflating:" | awk '{print $$2}' | xargs -I{} touch {}

data/json/japan.json: 000230936.pdf scripts/generate_japan.json.py ${POETRYDEPS}
	mkdir -p ${@D}
	${INITPYTHON_SCRIPTS} \
	&& python scripts/generate_japan.json.py -i $< -o $@

data/ics/japan/sunrise-sunset/%-sunrise-sunset.ics: data/json/japan.json ${POETRYDEPS}
	@echo "Generating $@"
	@mkdir -p "${@D}"
	@${INITPYTHON_GEN} && \
	python suntime-ics-generator/generate-calendar.py \
	--lat `cat data/json/japan.json | jq -r '.[] | select(.prefcode == "${*}") | .capital_lat'` \
	--lon `cat data/json/japan.json | jq -r '.[] | select(.prefcode == "${*}") | .capital_lon'` \
	--output $@ ${GENERATEOPTIONS} 2> /dev/null

data/ics/japan/sunrise/%-sunrise.ics: data/json/japan.json ${POETRYDEPS}
	@echo "Generating $@"
	@mkdir -p "${@D}"
	@${INITPYTHON_GEN} && \
	python suntime-ics-generator/generate-calendar.py \
	--lat `cat data/json/japan.json | jq -r '.[] | select(.prefcode == "${*}") | .capital_lat'` \
	--lon `cat data/json/japan.json | jq -r '.[] | select(.prefcode == "${*}") | .capital_lon'` \
	--output $@ --disable-sunset ${GENERATEOPTIONS} 2> /dev/null

data/ics/japan/sunset/%-sunset.ics: data/json/japan.json ${POETRYDEPS}
	@echo "Generating $@"
	@mkdir -p "${@D}"
	@${INITPYTHON_GEN} && \
	python suntime-ics-generator/generate-calendar.py \
	--lat `cat data/json/japan.json | jq -r '.[] | select(.prefcode == "${*}") | .capital_lat'` \
	--lon `cat data/json/japan.json | jq -r '.[] | select(.prefcode == "${*}") | .capital_lon'` \
	--output $@ --disable-sunrise ${GENERATEOPTIONS} 2> /dev/null

.PHONY: clean serve ics clean-dist
clean:
	rm -rf data/
	rm -rf website/public/data/
	rm -rf website/dist/

clean-dist: clean
	git submodule deinit -f suntime-ics-generator
	git ls-files --ignored --cached --exclude-standard | xargs -I{} git rm -r --cached {}
	rm -r scripts/.venv/

serve: all
	cd website && yarn serve

ics: $(ALL_ICS) website/public/data/ics/ website/public/data/json/
