// Warte bis das DOM vollständig geladen ist
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM geladen, Event-Listener werden eingerichtet');
    
    // BMI Rechner initialisieren
    const bmiCalculateBtn = document.getElementById('bmi-calculate');
    if (bmiCalculateBtn) {
        console.log('BMI-Button gefunden, füge Event-Listener hinzu');
        bmiCalculateBtn.addEventListener('click', calculateBMI);
    } else {
        console.error('BMI-Button konnte nicht gefunden werden');
    }
    
    // FFMI Rechner initialisieren
    const ffmiCalculateBtn = document.getElementById('ffmi-calculate');
    if (ffmiCalculateBtn) {
        console.log('FFMI-Button gefunden, füge Event-Listener hinzu');
        ffmiCalculateBtn.addEventListener('click', calculateFFMI);
    } else {
        console.error('FFMI-Button konnte nicht gefunden werden');
    }
    
    // 1RM Rechner initialisieren
    const ormCalculateBtn = document.getElementById('orm-calculate');
    if (ormCalculateBtn) {
        console.log('1RM-Button gefunden, füge Event-Listener hinzu');
        ormCalculateBtn.addEventListener('click', calculateORM);
    } else {
        console.error('1RM-Button konnte nicht gefunden werden');
    }
    
    // Kalorien Rechner initialisieren
    const calCalculateBtn = document.getElementById('cal-calculate');
    if (calCalculateBtn) {
        console.log('Kalorien-Button gefunden, füge Event-Listener hinzu');
        calCalculateBtn.addEventListener('click', calculateCalories);
    } else {
        console.error('Kalorien-Button konnte nicht gefunden werden');
    }
    
    // Muskelaufbaupotenzial Rechner initialisieren
    const mpCalculateBtn = document.getElementById('mp-calculate');
    if (mpCalculateBtn) {
        console.log('Muskelaufbaupotenzial-Button gefunden, füge Event-Listener hinzu');
        mpCalculateBtn.addEventListener('click', calculateMusclePotential);
    } else {
        console.error('Muskelaufbaupotenzial-Button konnte nicht gefunden werden');
    }
    
    // Eingaben bei Enter-Taste absenden
    const setupEnterKey = (sectionId, calculateFunction) => {
        const inputs = document.querySelectorAll(`#${sectionId} input[type="number"]`);
        inputs.forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    calculateFunction();
                }
            });
        });
    };
    
    setupEnterKey('bmi', calculateBMI);
    setupEnterKey('ffmi', calculateFFMI);
    setupEnterKey('oneRM', calculateORM);
    setupEnterKey('calories', calculateCalories);
    setupEnterKey('musclepotential', calculateMusclePotential);
});

// BMI berechnen
function calculateBMI() {
    console.log('BMI-Berechnung gestartet');
    
    const weight = parseFloat(document.getElementById('bmi-weight').value);
    const height = parseFloat(document.getElementById('bmi-height').value) / 100; // cm zu m
    const gender = document.querySelector('input[name="bmi-gender"]:checked').value;
    const resultElement = document.getElementById('bmi-result');
    
    console.log(`Eingegebene Werte: Gewicht=${weight}kg, Größe=${height}m, Geschlecht=${gender}`);
    
    // Validierung
    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        console.log('Ungültige Eingaben');
        resultElement.innerHTML = '<div class="result-placeholder">Bitte gib gültige Werte ein.</div>';
        return;
    }
    
    // BMI-Berechnung
    const bmi = weight / (height * height);
    console.log(`Berechneter BMI: ${bmi.toFixed(1)}`);
    
    // BMI-Kategorie bestimmen (geschlechtsspezifisch)
    let category = '';
    let categoryClass = '';
    let explanation = '';
    
    // Geschlechtsspezifische BMI-Kategorien
    if (gender === 'male') {
        if (bmi < 18.5) {
            category = 'Untergewicht';
            categoryClass = 'text-warning';
            explanation = 'Du liegst unter dem empfohlenen Gewichtsbereich für Männer.';
        } else if (bmi < 25) {
            category = 'Normalgewicht';
            categoryClass = 'text-success';
            explanation = 'Dein Gewicht liegt im gesunden Bereich für Männer.';
        } else if (bmi < 30) {
            category = 'Übergewicht';
            categoryClass = 'text-warning';
            explanation = 'Du liegst über dem empfohlenen Gewichtsbereich für Männer.';
        } else {
            category = 'Adipositas';
            categoryClass = 'text-danger';
            explanation = 'Dein BMI deutet auf ein erhöhtes Gesundheitsrisiko hin.';
        }
    } else { // female
        if (bmi < 17.5) { // Frauen haben leicht andere Kategorien
            category = 'Untergewicht';
            categoryClass = 'text-warning';
            explanation = 'Du liegst unter dem empfohlenen Gewichtsbereich für Frauen.';
        } else if (bmi < 24) {
            category = 'Normalgewicht';
            categoryClass = 'text-success';
            explanation = 'Dein Gewicht liegt im gesunden Bereich für Frauen.';
        } else if (bmi < 29) {
            category = 'Übergewicht';
            categoryClass = 'text-warning';
            explanation = 'Du liegst über dem empfohlenen Gewichtsbereich für Frauen.';
        } else {
            category = 'Adipositas';
            categoryClass = 'text-danger';
            explanation = 'Dein BMI deutet auf ein erhöhtes Gesundheitsrisiko hin.';
        }
    }
    
    console.log(`Kategorie: ${category}`);
    
    // Zusätzliche Informationen basierend auf Geschlecht
    const genderInfo = gender === 'male' 
        ? 'Männer haben typischerweise einen höheren Muskelanteil, was den BMI leicht erhöhen kann.' 
        : 'Frauen haben typischerweise einen höheren Körperfettanteil bei gleichem BMI verglichen mit Männern.';
    
    // Ergebnis mit Animation anzeigen
    resultElement.innerHTML = `
        <div class="result-highlight">${bmi.toFixed(1)}</div>
        <div class="result-category ${categoryClass}">${category}</div>
        <div class="progress-bar">
            <div class="progress-value" style="width: ${Math.min(bmi / 40 * 100, 100)}%"></div>
        </div>
        <div class="result-explanation">${explanation}</div>
        <div class="gender-info">${genderInfo}</div>
    `;
    
    console.log('BMI-Berechnung abgeschlossen');
}

// FFMI berechnen
function calculateFFMI() {
    console.log('FFMI-Berechnung gestartet');
    
    const weight = parseFloat(document.getElementById('ffmi-weight').value);
    const height = parseFloat(document.getElementById('ffmi-height').value) / 100; // cm zu m
    const bodyFat = parseFloat(document.getElementById('ffmi-bodyfat').value);
    const gender = document.querySelector('input[name="ffmi-gender"]:checked').value;
    const resultElement = document.getElementById('ffmi-result');
    
    console.log(`Eingegebene Werte: Gewicht=${weight}kg, Größe=${height}m, Körperfett=${bodyFat}%, Geschlecht=${gender}`);
    
    // Validierung
    if (isNaN(weight) || isNaN(height) || isNaN(bodyFat) || 
        weight <= 0 || height <= 0 || bodyFat < 0 || bodyFat > 50) {
        console.log('Ungültige Eingaben');
        resultElement.innerHTML = '<div class="result-placeholder">Bitte gib gültige Werte ein.</div>';
        return;
    }
    
    // Magermasse berechnen
    const leanMass = weight * (1 - (bodyFat / 100));
    console.log(`Berechnete Magermasse: ${leanMass.toFixed(1)}kg`);
    
    // FFMI berechnen
    const ffmi = leanMass / (height * height);
    console.log(`Berechneter FFMI: ${ffmi.toFixed(1)}`);
    
    // Korrigierter FFMI (für eine Referenzgröße von 1,83m)
    const adjustedFfmi = ffmi + (6.3 * (1.8 - height));
    console.log(`Korrigierter FFMI: ${adjustedFfmi.toFixed(1)}`);
    
    // FFMI-Kategorie bestimmen basierend auf Geschlecht
    let category = '';
    let categoryClass = '';
    let naturalLimit = 0;
    
    if (gender === 'male') {
        // Männliche FFMI-Kategorien
        naturalLimit = 25; // Natürliche Grenze für Männer
        
        if (adjustedFfmi < 18) {
            category = 'Unterdurchschnittliche Muskelmasse';
            categoryClass = 'text-warning';
        } else if (adjustedFfmi < 20) {
            category = 'Durchschnittliche Muskelmasse';
            categoryClass = 'text-primary';
        } else if (adjustedFfmi < 22) {
            category = 'Überdurchschnittliche Muskelmasse';
            categoryClass = 'text-success';
        } else if (adjustedFfmi < 23) {
            category = 'Exzellente Muskelmasse';
            categoryClass = 'text-success';
        } else if (adjustedFfmi < 26) {
            category = 'Hervorragende Muskelmasse';
            categoryClass = 'text-success';
        } else if (adjustedFfmi < 28) {
            category = 'Außergewöhnliche Muskelmasse';
            categoryClass = 'text-primary';
        } else {
            category = 'Sehr außergewöhnliche Muskelmasse';
            categoryClass = 'text-primary';
        }
    } else {
        // Weibliche FFMI-Kategorien (niedriger angesetzt, da Frauen natürlicherweise weniger Muskelmasse haben)
        naturalLimit = 22; // Natürliche Grenze für Frauen
        
        if (adjustedFfmi < 15) {
            category = 'Unterdurchschnittliche Muskelmasse';
            categoryClass = 'text-warning';
        } else if (adjustedFfmi < 17) {
            category = 'Durchschnittliche Muskelmasse';
            categoryClass = 'text-primary';
        } else if (adjustedFfmi < 18.5) {
            category = 'Überdurchschnittliche Muskelmasse';
            categoryClass = 'text-success';
        } else if (adjustedFfmi < 20) {
            category = 'Exzellente Muskelmasse';
            categoryClass = 'text-success';
        } else if (adjustedFfmi < 22) {
            category = 'Hervorragende Muskelmasse';
            categoryClass = 'text-success';
        } else if (adjustedFfmi < 24) {
            category = 'Außergewöhnliche Muskelmasse';
            categoryClass = 'text-primary';
        } else {
            category = 'Sehr außergewöhnliche Muskelmasse';
            categoryClass = 'text-primary';
        }
    }
    
    console.log(`Kategorie: ${category}`);
    
    // Natürliche Grenze prüfen und Hinweis hinzufügen
    let naturalLimitInfo = '';
    if (adjustedFfmi > naturalLimit) {
        naturalLimitInfo = `<p class="natural-limit-warning">Dein FFMI liegt über dem typischen natürlichen Limit für ${gender === 'male' ? 'Männer' : 'Frauen'} (${naturalLimit}).</p>`;
    }
    
    // Geschlechtsspezifische Information
    const genderInfo = gender === 'male' 
        ? 'Männer haben typischerweise einen höheren FFMI aufgrund höherer Testosteronspiegel, die das Muskelwachstum fördern.' 
        : 'Frauen haben typischerweise einen niedrigeren FFMI aufgrund geringerer Testosteronwerte, was den Muskelaufbau beeinflusst.';
    
    // Ergebnis mit Animation anzeigen
    resultElement.innerHTML = `
        <div class="result-highlight">${adjustedFfmi.toFixed(1)}</div>
        <div class="result-category ${categoryClass}">${category}</div>
        <div class="progress-bar">
            <div class="progress-value" style="width: ${Math.min(adjustedFfmi / (gender === 'male' ? 30 : 25) * 100, 100)}%"></div>
        </div>
        <p>Normaler FFMI: ${ffmi.toFixed(1)}</p>
        <p>Korrigierter FFMI: ${adjustedFfmi.toFixed(1)}</p>
        ${naturalLimitInfo}
        <div class="gender-info">${genderInfo}</div>
    `;
    
    console.log('FFMI-Berechnung abgeschlossen');
}

// 1RM berechnen
function calculateORM() {
    console.log('1RM-Berechnung gestartet');
    
    const weight = parseFloat(document.getElementById('orm-weight').value);
    const reps = parseInt(document.getElementById('orm-reps').value);
    const formula = document.querySelector('input[name="orm-formula"]:checked').value;
    const resultElement = document.getElementById('orm-result');
    
    console.log(`Eingegebene Werte: Gewicht=${weight}kg, Wiederholungen=${reps}, Formel=${formula}`);
    
    // Validierung
    if (isNaN(weight) || isNaN(reps) || weight <= 0 || reps <= 0 || reps > 30) {
        console.log('Ungültige Eingaben');
        resultElement.innerHTML = '<div class="result-placeholder">Bitte gib gültige Werte ein.</div>';
        return;
    }
    
    // 1RM Berechnung je nach Formel
    let oneRM = 0;
    if (formula === 'brzycki') {
        // Brzycki Formel
        oneRM = weight * (36 / (37 - reps));
    } else {
        // Epley Formel
        oneRM = weight * (1 + 0.0333 * reps);
    }
    
    console.log(`Berechnetes 1RM: ${oneRM.toFixed(1)}kg`);
    
    // Tabelle mit prozentualem Anteil des 1RM erstellen
    const percentages = [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50];
    let tableHTML = `
        <table class="result-table">
            <thead>
                <tr>
                    <th>% des 1RM</th>
                    <th>Gewicht (kg)</th>
                    <th>Mögliche Wdh.</th>
                </tr>
            </thead>
            <tbody>`;
    
    percentages.forEach(percentage => {
        const weight = (oneRM * (percentage / 100)).toFixed(1);
        // Geschätzte mögliche Wiederholungen je nach Prozentsatz
        let estimatedReps = "";
        
        if (percentage <= 55) estimatedReps = "20+";
        else if (percentage <= 60) estimatedReps = "18-20";
        else if (percentage <= 65) estimatedReps = "15-17";
        else if (percentage <= 70) estimatedReps = "12-15";
        else if (percentage <= 75) estimatedReps = "10-12";
        else if (percentage <= 80) estimatedReps = "8-10";
        else if (percentage <= 85) estimatedReps = "5-8";
        else if (percentage <= 90) estimatedReps = "3-5";
        else if (percentage <= 95) estimatedReps = "1-3";
        else estimatedReps = "1";
        
        tableHTML += `
            <tr>
                <td>${percentage}%</td>
                <td>${weight} kg</td>
                <td>${estimatedReps}</td>
            </tr>`;
    });
    
    tableHTML += `
            </tbody>
        </table>`;
    
    // Ergebnis anzeigen
    resultElement.innerHTML = `
        <div class="result-highlight">${oneRM.toFixed(1)} kg</div>
        <div class="result-category text-primary">Dein geschätztes 1RM</div>
        <p>Berechnet mit der ${formula === 'brzycki' ? 'Brzycki' : 'Epley'} Formel</p>
        <p>Auf Basis von ${weight} kg für ${reps} Wiederholungen</p>
        ${tableHTML}
    `;
    
    console.log('1RM-Berechnung abgeschlossen');
}

// Kalorien berechnen
function calculateCalories() {
    console.log('Kalorien-Berechnung gestartet');
    
    const weight = parseFloat(document.getElementById('cal-weight').value);
    const height = parseFloat(document.getElementById('cal-height').value);
    const age = parseInt(document.getElementById('cal-age').value);
    const gender = document.querySelector('input[name="cal-gender"]:checked').value;
    const activity = parseFloat(document.getElementById('cal-activity').value);
    const resultElement = document.getElementById('cal-result');
    
    console.log(`Eingegebene Werte: Gewicht=${weight}kg, Größe=${height}cm, Alter=${age}, Geschlecht=${gender}, Aktivität=${activity}`);
    
    // Validierung
    if (isNaN(weight) || isNaN(height) || isNaN(age) || weight <= 0 || height <= 0 || age <= 0) {
        console.log('Ungültige Eingaben');
        resultElement.innerHTML = '<div class="result-placeholder">Bitte gib gültige Werte ein.</div>';
        return;
    }
    
    // Grundumsatz mit Harris-Benedict-Formel berechnen
    let bmr = 0;
    if (gender === 'male') {
        // Männer
        bmr = 66.5 + (13.75 * weight) + (5.003 * height) - (6.755 * age);
    } else {
        // Frauen
        bmr = 655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age);
    }
    
    // Gesamtumsatz berechnen (BMR * Aktivitätsfaktor)
    const tdee = bmr * activity;
    
    console.log(`Berechneter Grundumsatz: ${bmr.toFixed(0)} kcal, Gesamtumsatz: ${tdee.toFixed(0)} kcal`);
    
    // Makronährstoffempfehlungen berechnen
    const protein = weight * 1.8; // 1.8g Protein pro kg Körpergewicht
    const fat = (tdee * 0.25) / 9; // 25% der Kalorien aus Fett (9 kcal pro Gramm)
    const carbs = (tdee - (protein * 4) - (fat * 9)) / 4; // Rest aus Kohlenhydraten (4 kcal pro Gramm)
    
    // Kalorien für verschiedene Ziele berechnen
    const cutTdee = tdee * 0.8; // Kaloriendefizit (20%)
    const bulkTdee = tdee * 1.1; // Kalorienüberschuss (10%)
    
    // Ergebnis anzeigen
    resultElement.innerHTML = `
        <div class="result-highlight">${tdee.toFixed(0)} kcal</div>
        <div class="result-category text-primary">Dein täglicher Kalorienbedarf</div>
        <p>Grundumsatz (BMR): ${bmr.toFixed(0)} kcal</p>
        <p>Gesamtumsatz (TDEE): ${tdee.toFixed(0)} kcal</p>
        
        <div class="result-section">
            <h3>Ziele:</h3>
            <p>Abnehmen: ${cutTdee.toFixed(0)} kcal</p>
            <p>Muskelaufbau: ${bulkTdee.toFixed(0)} kcal</p>
        </div>
        
        <div class="result-section">
            <h3>Empfohlene Makronährstoffverteilung:</h3>
            <p>Protein: ${protein.toFixed(0)}g (${(protein * 4).toFixed(0)} kcal)</p>
            <p>Fett: ${fat.toFixed(0)}g (${(fat * 9).toFixed(0)} kcal)</p>
            <p>Kohlenhydrate: ${carbs.toFixed(0)}g (${(carbs * 4).toFixed(0)} kcal)</p>
        </div>
    `;
    
    console.log('Kalorien-Berechnung abgeschlossen');
}
