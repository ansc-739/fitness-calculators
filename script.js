// Warte bis das DOM vollständig geladen ist
document.addEventListener('DOMContentLoaded', function() {
    // BMI Rechner initialisieren
    const bmiCalculateBtn = document.getElementById('bmi-calculate');
    if (bmiCalculateBtn) {
        bmiCalculateBtn.addEventListener('click', calculateBMI);
    }
    
    // FFMI Rechner initialisieren
    const ffmiCalculateBtn = document.getElementById('ffmi-calculate');
    if (ffmiCalculateBtn) {
        ffmiCalculateBtn.addEventListener('click', calculateFFMI);
    }
    
    // Eingaben bei Enter-Taste absenden
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const calculatorId = this.id.split('-')[0]; // Extrahiert 'bmi' oder 'ffmi'
                if (calculatorId === 'bmi') {
                    calculateBMI();
                } else if (calculatorId === 'ffmi') {
                    calculateFFMI();
                }
            }
        });
    });
});

// BMI berechnen
function calculateBMI() {
    const weight = parseFloat(document.getElementById('bmi-weight').value);
    const height = parseFloat(document.getElementById('bmi-height').value) / 100; // cm zu m
    const resultElement = document.getElementById('bmi-result');
    
    // Validierung
    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        resultElement.innerHTML = '<div class="result-placeholder">Bitte gib gültige Werte ein.</div>';
        return;
    }
    
    // BMI-Berechnung
    const bmi = weight / (height * height);
    
    // BMI-Kategorie bestimmen
    let category = '';
    let categoryClass = '';
    let explanation = '';
    
    if (bmi < 18.5) {
        category = 'Untergewicht';
        categoryClass = 'text-warning';
        explanation = 'Du liegst unter dem empfohlenen Gewichtsbereich.';
    } else if (bmi < 25) {
        category = 'Normalgewicht';
        categoryClass = 'text-success';
        explanation = 'Dein Gewicht liegt im gesunden Bereich.';
    } else if (bmi < 30) {
        category = 'Übergewicht';
        categoryClass = 'text-warning';
        explanation = 'Du liegst über dem empfohlenen Gewichtsbereich.';
    } else {
        category = 'Adipositas';
        categoryClass = 'text-danger';
        explanation = 'Dein BMI deutet auf ein erhöhtes Gesundheitsrisiko hin.';
    }
    
    // Ergebnis mit Animation anzeigen
    resultElement.innerHTML = `
        <div class="result-highlight">${bmi.toFixed(1)}</div>
        <div class="result-category ${categoryClass}">${category}</div>
        <div class="progress-bar">
            <div class="progress-value" style="width: ${Math.min(bmi / 40 * 100, 100)}%"></div>
        </div>
        <div class="result-explanation">${explanation}</div>
    `;
}

// FFMI berechnen
function calculateFFMI() {
    const weight = parseFloat(document.getElementById('ffmi-weight').value);
    const height = parseFloat(document.getElementById('ffmi-height').value) / 100; // cm zu m
    const bodyFat = parseFloat(document.getElementById('ffmi-bodyfat').value);
    const resultElement = document.getElementById('ffmi-result');
    
    // Validierung
    if (isNaN(weight) || isNaN(height) || isNaN(bodyFat) || 
        weight <= 0 || height <= 0 || bodyFat < 0 || bodyFat > 50) {
        resultElement.innerHTML = '<div class="result-placeholder">Bitte gib gültige Werte ein.</div>';
        return;
    }
    
    // Magermasse berechnen
    const leanMass = weight * (1 - (bodyFat / 100));
    
    // FFMI berechnen
    const ffmi = leanMass / (height * height);
    
    // Korrigierter FFMI (für eine Referenzgröße von 1,83m)
    const adjustedFfmi = ffmi + (6.3 * (1.8 - height));
    
    // FFMI-Kategorie bestimmen
    let category = '';
    let categoryClass = '';
    
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
    
    // Ergebnis mit Animation anzeigen
    resultElement.innerHTML = `
        <div class="result-highlight">${adjustedFfmi.toFixed(1)}</div>
        <div class="result-category ${categoryClass}">${category}</div>
        <div class="progress-bar">
            <div class="progress-value" style="width: ${Math.min(adjustedFfmi / 30 * 100, 100)}%"></div>
        </div>
        <p>Normaler FFMI: ${ffmi.toFixed(1)}</p>
        <p>Korrigierter FFMI: ${adjustedFfmi.toFixed(1)}</p>
    `;
}