# Pi-Project Fabian Kleine und Gian-Lucca Kaworsky

## Starten des Projekts
Das Repository liegt einmal unter /var/www/html/pi-project für das PHP Backend und einmal unter /home/it/pi-project/ um Python laufen zu lassen.

### Sensor Daten in die Datenbank laden

##### Virtual Enviroment
Zuerst muss man ein virtual Enviroment aufmachen mit `source python/.venv/bin/activate` um alle Dependencies für die Sensore zu laden.
##### Virtual Enviroment Einrichten
Falls keine .venv Datei existiert muss erst mit `python3 -m venv python/.venv`und wenn dependencies fehlen führt man in der Virtual Enviroment `pip install -r python/requirements.txt` aus.
##### Py Datei ausführen
Dann führt man mit `python main.py` die python datei aus, die die Daten von den Sensoren alle 5 Minuten in die Datenbank lädt

### Backend
Im Backend Ordner liegt ein PHP Projekt welches mit PDO eine Verbindung zur Datenbank aufbaut um eine APi für das Frontend zu bilden

### Frontend


## Verkabelung beider Sensoren

### BME680 Sensor

VIN -> 3v3
GND -> GND
SCK -> SCL1
SDI -> SDA1

### RCWL-0516

VIN -> 3v3
CUT -> GPO22
GND -> GND

### Bilder der Schaltung

#### Komplette Schaltung
![Full Circuit](./images/CompleteCircuit.jpg)

#### Board
![Full Circuit](./images/Board.jpg)
#### BME680
![Full Circuit](./images/BME680.jpg)

#### RCWL
![Full Circuit](./images/RCWL.jpg)

