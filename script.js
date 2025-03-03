// Elements
const provinceSelect = document.getElementById('province');
const districtSelect = document.getElementById('district');
const stationTypeSelect = document.getElementById('stationType');
const stationNameSelect = document.getElementById('stationName');
const instrumentSelect = document.getElementById('instrument');
const maintenanceForm = document.getElementById('maintenanceForm');
const maintenanceDateInput = document.getElementById('maintenanceDate');
const recommendedDateInput = document.getElementById('recommendedDate');
const performedWorkInput = document.getElementById('performedWork');
const uploadDocumentInput = document.getElementById('uploadDocument');
const saveMaintenanceButton = document.getElementById('saveMaintenance');
const maintenanceTableWrapper = document.getElementById('maintenanceTableWrapper');
const maintenanceTableBody = document.getElementById('maintenanceRecords');

// Data
const data = {
    Kigali: {
        Gasabo: {
            ARG: ['Ndera ARG','Rubungo','Jali','Gikomero'],
            MRG: ['Rusororo MRG', 'Kabuga MRG'],
            AWS: ['Rusororo AWS', 'Kabuga AWS'],
            ASS: ['Rusororo ASS', 'Kabuga ASS']
        },
        Nyarugenge: {
            ARG: ['Rugunga', 'Kigali Sector','Gikomero','Butamwa/Mageragere'],
            MRG: ['Gitega MRG', 'Kimisagara MRG'],
            AWS: ['Gitega AWS', 'Kimisagara AWS'],
            ASS: ['Gitega ASS', 'Kimisagara ASS']

        },
        Kicukiro: {
            ARG: ['Masaka ARG','Rubirizi','Kanombe','Gahanga'],
            MRG: ['Masaka MRG', 'Masaka MRG'],
            AWS: ['Masaka AWS', 'Masaka AWS'],
            }
    },
    East: {
        Rwamagana: {
            ARG: ['Nzige ARG', 'Musha ARG','Bicumbi','Gishari','Mwulire'],
            MRG: ['Nzige MRG', 'Musha MRG'],
            AWS: ['Rwamagana'],
                },
        Kayonza: {
            ARG: ['Kabarondo ARG', 'Rukarara','Akagera-Cyarubare','Ganini','Kiziguro','Mukarange','Rukara(PNILP)','Murama','Mwiri','Ndego','Rwinkwavu'],
            MRG: ['Kabarondo MRG', 'Kabarondo MRG'],
            AWS: ['Kawangire AWS', 'Kawangire AWS'],
            ASS: ['Kawangire ASS']
        },
        Ngoma: {
            ARG: ['Zaza ARG', 'Sake ARG','Mutenderi','Jarama','Murama'],
            MRG: ['Zaza MRG', 'Kazo MRG'],
            AWS: ['Kazo AWS'],
            ASS: ['Kazo ASS']

        },
        Kirehe: {
            ARG: ['Nyamugali ARG', 'Musaza','Kirehe','Nyarubuye','Gahara','Bukora'],
            MRG: ['Nyarubuye MRG'],
            AWS: ['Nasho-Mphanga AWS', 'Kazo AWS'],
            
        },Gatsibo: {
            ARG: ['Gasange ARG', 'Kiziguro ARG','Muhura','Nyagahanga','Rwimbogo','Ngarama','Kabarore'],
            MRG: ['Zaza MRG', 'Kazo MRG'],
            AWS: ['Zaza AWS', 'Kazo AWS'],
          
        },
        Nyagatare: {
            ARG: ['Nyakiga-karama, Gabiro ARG', 'Kagitumba ARG','Karangazi','Rwempasha'],
            MRG: ['Zaza MRG', 'Kazo MRG'],
            AWS: ['Nyagatare AWS'],
            ASS: ['Nyagatare']

        },
        Bugesera: {
            ARG: ['Ruhuha ARG', 'Kazo ARG'],
            MRG: ['Ruhuha'],
            AWS: ['Mayange AWS', 'Gahanga AWS'],
            ASS: ['Juru', 'Karama','Nyamata']
        }
    },
    North: {
        Gicumbi: {
            ARG: ['Rwesero ARG','Cyumba','Muko','Kabeza/Nyamiyaga','Mulindi-usine','Bwisige'],
            MRG: ['Rusororo MRG', 'Kabuga MRG'],
            AWS: ['Gicumbi AWS'],
            ASS: ['Gicumbi']
        },
        Gakenye: {
            ARG: ['Janja', 'Gakenye District','Cyabongo','Muyongwe','Minazi','Nemba','Ruli','Rushashi'],
            MRG: ['Gitega MRG', 'Kimisagara MRG'],
            AWS: ['Gitega AWS', 'Kimisagara AWS'],
                    },
        Musanze: {
            ARG: ['Remera ARG','Shyingiro','Rwaza','Nyange','Musanze','Kinigi'],
            MRG: ['Masaka MRG', 'Masaka MRG'],
            AWS: ['Musanze-Aero'],
            ASS: ['Busogo','Musanze-Aero']
        },
        Rulindo: {
                ARG: ['Rusiga','Rulindo Parich','Rulindo district','Rukozo','Mugambazi','Kinihira','Cyinzuzi','Rutongo'],
                MRG: ['Masaka MRG', 'Masaka MRG'],
                AWS: ['Masaka AWS', 'Masaka AWS'],
        },
         Burera: {
                    ARG: ['Rwerere ','Ruhende','Ntaruka','Kinoni','Kagogo','Butaro','Bungwe'],
                    MRG: ['Masaka MRG', 'Masaka MRG'],
                    AWS: ['Masaka AWS', 'Masaka AWS'],
          }
    },
};

const instruments = {
    ARG: ['Battery', 'Rain Gauge Sensor', 'Regulator', 'Solar Panel', 'Support', 'Water Collector', 'Data Logger','Battery'],
    MRG: ['Support', 'Water Collector', 'Measuring Cylinder'],
    AWS: ['Anemometer', 'Barometer', 'Rain Gauge Sensor', 'Solar Panel', 'Data Logger','Battery','Air-Humidity sensor','Global solar radiation sensor','Direect solar radiation sensor','Wind vane','Soil temperature sensor','soil moisture sensor','lightening detector'],
    ASS: ['Hygrometer', 'Thermometer', 'Barograph','manual rain gauge', 'Soil Thermometer at 10 cm', 'Soil Thermometer at 20 cm','Soil Thermometer at 50 cm','Soil Thermometer at 100 cm','Digital thermometer', 'Maximun and minimum thermometer','Minimum Glass thermometer','evaporation piche','evaporation pan','hook gauge','Sunshine recorder','Stevenson screen','psychrometer','Analogy minimum thermometer']
};

// Store maintenance records for each instrument
const maintenanceRecordsData = {};

// Event Listeners
provinceSelect.addEventListener('change', () => {
    const province = provinceSelect.value;
    districtSelect.innerHTML = '<option value="">--Select District--</option>';
    stationTypeSelect.innerHTML = '<option value="">--Select Type of Station--</option>';
    stationNameSelect.innerHTML = '<option value="">--Select Station Name--</option>';
    instrumentSelect.innerHTML = '<option value="">--Select Instrument--</option>';
    maintenanceForm.classList.add('hidden');
    maintenanceTableWrapper.classList.add('hidden');
    maintenanceTableBody.innerHTML = '';

    if (province) {
        const districts = Object.keys(data[province]);
        districts.forEach(district => {
            const option = document.createElement('option');
            option.value = district;
            option.textContent = district;
            districtSelect.appendChild(option);
        });
    }
});

districtSelect.addEventListener('change', () => {
    const province = provinceSelect.value;
    const district = districtSelect.value;
    stationTypeSelect.innerHTML = '<option value="">--Select Type of Station--</option>';
    stationNameSelect.innerHTML = '<option value="">--Select Station Name--</option>';
    instrumentSelect.innerHTML = '<option value="">--Select Instrument--</option>';
    maintenanceForm.classList.add('hidden');
    maintenanceTableWrapper.classList.add('hidden');
    maintenanceTableBody.innerHTML = '';

    if (district) {
        const stationTypes = Object.keys(data[province][district]);
        stationTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            switch(type) {
                case 'ARG':
                    option.textContent = 'Automatic Rain Gauge';
                    break;
                case 'MRG':
                    option.textContent = 'Manual Rain Gauge';
                    break;
                case 'AWS':
                    option.textContent = 'Automatic Weather Gauge';
                    break;
                case 'ASS':
                    option.textContent = 'Agro-Synoptic Weather Station';
                    break;
                default:
                    option.textContent = type;
            }
            stationTypeSelect.appendChild(option);
        });
    }
});

stationTypeSelect.addEventListener('change', () => {
    const province = provinceSelect.value;
    const district = districtSelect.value;
    const stationType = stationTypeSelect.value;
    stationNameSelect.innerHTML = '<option value="">--Select Station Name--</option>';
    instrumentSelect.innerHTML = '<option value="">--Select Instrument--</option>';
    maintenanceForm.classList.add('hidden');
    maintenanceTableWrapper.classList.add('hidden');
    maintenanceTableBody.innerHTML = '';

    if (stationType) {
        const stations = data[province][district][stationType];
        stations.forEach(station => {
            const option = document.createElement('option');
            option.value = station;
            option.textContent = station;
            stationNameSelect.appendChild(option);
        });
    }
});

stationNameSelect.addEventListener('change', () => {
    const stationType = stationTypeSelect.value;
    instrumentSelect.innerHTML = '<option value="">--Select Instrument--</option>';
    maintenanceForm.classList.add('hidden');
    maintenanceTableWrapper.classList.add('hidden');
    maintenanceTableBody.innerHTML = '';

    if (stationType) {
        const availableInstruments = instruments[stationType];
        availableInstruments.forEach(instrument => {
            const option = document.createElement('option');
            option.value = instrument;
            option.textContent = instrument;
            instrumentSelect.appendChild(option);
        });
    }
});

instrumentSelect.addEventListener('change', () => {
    const selectedInstrument = instrumentSelect.value;
    maintenanceForm.classList.toggle('hidden', !selectedInstrument);
    maintenanceTableWrapper.classList.toggle('hidden', !selectedInstrument);

    if (selectedInstrument) {
        displayMaintenanceRecords(selectedInstrument);
    }
});

saveMaintenanceButton.addEventListener('click', () => {
    const selectedInstrument = instrumentSelect.value;
    const maintenanceDate = maintenanceDateInput.value;
    const recommendedDate = recommendedDateInput.value;
    const performedWork = performedWorkInput.value;
    const documentFile = uploadDocumentInput.files[0];

    if (!maintenanceDate || !recommendedDate || !performedWork) {
        alert('Please fill in all fields and upload a document.');
        return;
    }

    const record = {
        maintenanceDate,
        recommendedDate,
        performedWork,
        documentFile: documentFile ? URL.createObjectURL(documentFile) : null
    };

    if (!maintenanceRecordsData[selectedInstrument]) {
        maintenanceRecordsData[selectedInstrument] = [];
    }

    maintenanceRecordsData[selectedInstrument].unshift(record);

    // Display the updated records
    displayMaintenanceRecords(selectedInstrument);

    // Clear the form
    maintenanceDateInput.value = '';
    recommendedDateInput.value = '';
    performedWorkInput.value = '';
    uploadDocumentInput.value = '';
});

// Function to display maintenance records for the selected instrument
function displayMaintenanceRecords(instrument) {
    maintenanceTableBody.innerHTML = ''; // Clear the current records
    const records = maintenanceRecordsData[instrument] || [];
    
    records.forEach(record => {
        const newRow = document.createElement('tr');

        const maintenanceDateCell = document.createElement('td');
        maintenanceDateCell.textContent = record.maintenanceDate;
        newRow.appendChild(maintenanceDateCell);

        const performedWorkCell = document.createElement('td');
        performedWorkCell.textContent = record.performedWork;
        newRow.appendChild(performedWorkCell);

        const recommendedDateCell = document.createElement('td');
        recommendedDateCell.textContent = record.recommendedDate;
        newRow.appendChild(recommendedDateCell);

        const documentCell = document.createElement('td');
        if (record.documentFile) {
            const documentLink = document.createElement('a');
            documentLink.textContent = 'View Document';
            documentLink.href = record.documentFile;
            documentLink.target = '_blank';
            documentCell.appendChild(documentLink);
        } else {
            documentCell.textContent = 'No document';
        }
        newRow.appendChild(documentCell);

        maintenanceTableBody.appendChild(newRow);
    });
}
