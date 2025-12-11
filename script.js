function calculate() {
  const primary = parseFloat(document.getElementById('primaryCoil').value);
  const inputV = parseFloat(document.getElementById('inputVoltage').value);
  const inputA = parseFloat(document.getElementById('inputAmp').value);
  const outputV = parseFloat(document.getElementById('outputVoltage').value);
  const safeMode = document.getElementById('safeMode').checked;

  if (!outputV) {
    alert('Output Voltage is required');
    return;
  }

  // Default safe/absolute minimum multipliers
  const safeMultiplier = safeMode ? 1.2 : 1;

  // Determine primary coil turns if empty
  let primaryTurns = primary || 100; // default minimal primary turns
  let secondaryTurns = primaryTurns * (outputV / (inputV || outputV)) * safeMultiplier;

  // Input voltage calculation if missing
  let calculatedInputV = inputV || (primaryTurns * outputV / secondaryTurns);

  // Input amp calculation
  let calculatedInputA = inputA || 1 * safeMultiplier; // default minimum or safe

  // Output amp calculation
  let outputAmp = (calculatedInputA * calculatedInputV) / outputV * safeMultiplier;

  // Fill fields
  document.getElementById('primaryCoil').value = primaryTurns.toFixed(0);
  document.getElementById('secondaryCoil').value = secondaryTurns.toFixed(0);
  document.getElementById('inputVoltage').value = calculatedInputV.toFixed(2);
  document.getElementById('inputAmp').value = calculatedInputA.toFixed(2);
  document.getElementById('outputAmp').value = outputAmp.toFixed(2);
}
  
function clearFields() {
  const fields = ['primaryCoil','secondaryCoil','inputVoltage','inputAmp','outputVoltage','outputAmp'];
  fields.forEach(id => document.getElementById(id).value = '');
  document.getElementById('safeMode').checked = true;
}
