const logoMap = {
  'instagram.com': 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png',
  'youtube.com': 'https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg',
  'linkedin.com': 'https://cdn-icons-png.flaticon.com/512/174/174857.png',
  'twitter.com': 'https://cdn-icons-png.flaticon.com/512/733/733579.png',
  'facebook.com': 'https://cdn-icons-png.flaticon.com/512/733/733547.png',
  'github.com': 'https://cdn-icons-png.flaticon.com/512/733/733553.png',
  'telegram.org': 'https://cdn-icons-png.flaticon.com/512/2111/2111646.png'
};

let qrCode;

function getLogoUrl(input) {
  input = input.toLowerCase();
  for (const domain in logoMap) {
    if (input.includes(domain)) {
      return logoMap[domain];
    }
  }
  return "";
}

document.getElementById('qrForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const input = document.getElementById('textInput').value.trim();
  if (!input) {
    alert("Please enter some text or a URL");
    return;
  }

  let logoUrl = "";
  try {
    const url = new URL(input);
    logoUrl = getLogoUrl(url.hostname);
  } catch (e) {
    logoUrl = "";
  }

  const format = document.getElementById('fileType').value;
  const qrContainer = document.getElementById('qrCode');
  qrContainer.innerHTML = '';

  qrCode = new QRCodeStyling({
    width: 250,
    height: 250,
    data: input,
    image: logoUrl || undefined,
    dotsOptions: {
      color: "#000",
      type: "rounded"
    },
    backgroundOptions: {
      color: "#fff"
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 5,
      imageSize: 0.25
    }
  });

  qrCode.append(qrContainer);
  document.getElementById('downloadBtn').style.display = 'inline-block';
});

document.getElementById('downloadBtn').addEventListener('click', function() {
  if (qrCode) {
    const format = document.getElementById('fileType').value;
    qrCode.download({ name: "qr-code", extension: format });
  }
});

const themeBtn = document.getElementById('themeToggle');
themeBtn.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-mode');
  themeBtn.textContent = isDark ? '🌙' : '🌞';
  themeBtn.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
});
document.addEventListener('DOMContentLoaded', () => {
  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    themeBtn.textContent = '🌙';
    themeBtn.title = 'Switch to light mode';
  } else {
    themeBtn.textContent = '🌞';
    themeBtn.title = 'Switch to dark mode';
  }
});
