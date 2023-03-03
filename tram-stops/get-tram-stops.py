import json

inputFile = "./tram-stops/stops.txt"
isTramStop = "(Manchester Metrolink)"

tramStops = set()

with open(inputFile, "r") as stops:
    # Return only the Metrolink Tram Stops from the list of stops
    for stop in stops:
        if isTramStop in stop:
            # Remove all irrelevant data and only return the stop name
            normalisedStopName = stop.split(
                ",")[2].removesuffix(isTramStop).rstrip()
            tramStops.add(normalisedStopName)
stops.close()

stopDictionary = dict()

# The TFGM API accepts some tram stops under very particular names
stPetersSquare = "St Peter's Square"
fixedStPetersSquare = "St Peter''s Square"
deansgate = "Deansgate Castlefield"
fixedDeansgate = "Deansgate - Castlefield"

for stop in tramStops:
    if (stPetersSquare in stop):
        # { "St Peter''s Square": "St Peter's Square" }
        stopDictionary[fixedStPetersSquare] = stop
    elif (deansgate in stop):
        # { "Deansgate - Castlefield": "Deansgate Castlefield" }
        stopDictionary[fixedDeansgate] = stop
    else:
        # { "Piccadilly Gardens": "Piccadilly Gardens" }
        stopDictionary[stop] = stop

with open('./tram-stops/tramStops.json', 'w', encoding='utf-8') as json_file:
    json.dump(stopDictionary, json_file, ensure_ascii=False, indent=4)
json_file.close()
