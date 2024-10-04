let svgElement = null;

// Aguarda o carregamento do SVG
document.getElementById('svg-container').addEventListener('load', function() {
  svgElement = document.getElementById('svg-container').contentDocument.querySelector('svg');
  console.log('SVG carregado:', svgElement);
});

function generateSignature() {
  // Certifique-se de que o SVG foi carregado corretamente
  if (!svgElement) {
    alert('SVG ainda não foi carregado corretamente.');
    return;
  }

  // Captura os dados do formulário
  var name = document.getElementById('name').value;
  var role = document.getElementById('role').value;
  var phone = document.getElementById('phone').value;
  var email = document.getElementById('email').value;
  var address = document.getElementById('address').value;
  var website = document.getElementById('website').value;

  console.log('Tentando modificar o SVG...');

  // Acessar os elementos do SVG com os IDs correspondentes
  var nameField = svgElement.getElementById('path130');  // Substitua pelo ID correto
  var roleField = svgElement.getElementById('role-field');  // Verifique o ID correto no SVG
  var phoneField = svgElement.getElementById('phone-field');  // Verifique o ID correto no SVG
  var emailField = svgElement.getElementById('email-field');  // Verifique o ID correto no SVG
  var addressField = svgElement.getElementById('address-field');  // Verifique o ID correto no SVG
  var websiteField = svgElement.getElementById('website-field');  // Verifique o ID correto no SVG

  // Atualizando os campos do SVG
  if (nameField) nameField.textContent = name;
  if (roleField) roleField.textContent = role;
  if (phoneField) phoneField.textContent = phone;
  if (emailField) emailField.textContent = email;
  if (addressField) addressField.textContent = address;
  if (websiteField) websiteField.textContent = website;

  console.log('Modificações aplicadas no SVG.');

  // Converter o SVG para imagem se necessário
  svgToCanvas(svgElement);
}

function svgToCanvas(svgElement) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var svgData = new XMLSerializer().serializeToString(svgElement);

  var img = new Image();
  var svgSize = svgElement.getBoundingClientRect();
  canvas.width = svgSize.width;
  canvas.height = svgSize.height;

  img.onload = function() {
    ctx.drawImage(img, 0, 0);
    
    // Exibe botão de download
    document.getElementById('download-btn').style.display = 'block';

    // Adiciona o canvas ao DOM (pode ser escondido)
    document.body.appendChild(canvas);
    canvas.style.display = 'none';
  };

  img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
}

document.getElementById('download-btn').addEventListener('click', function() {
  var canvas = document.querySelector('canvas');
  if (!canvas) {
    alert("Canvas não foi gerado corretamente.");
    return;
  }
  var jpegData = canvas.toDataURL('image/jpeg');

  var a = document.createElement('a');
  a.href = jpegData;
  a.download = 'assinatura.jpeg';
  a.click();
});
