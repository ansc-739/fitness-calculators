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
    
    // Eingaben bei Enter-Taste absenden
    const bmiInputs = document.querySelectorAll('#bmi input[type="number"]');
    bmiInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateBMI();
            }
        });
    });
    
    const ffmiInputs = document.querySelectorAll('#ffmi input[type="number"]');
    ffmiInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateFFMI();
            }
        });
    });
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