function nextPage(fromPage, toPage) {
  const currentCard = document.getElementById(`page${fromPage}`);
  const nextCard = document.getElementById(`page${toPage}`);

  currentCard.classList.remove('active');

  setTimeout(() => {
    currentCard.style.display = 'none';
    nextCard.style.display = 'block';
    setTimeout(() => {
      nextCard.classList.add('active');
    }, 50);
  }, 300);
}

async function submitDateTime() {
  const dateValue = document.getElementById('dateInput').value;
  const timeValue = document.getElementById('timeInput').value;

  if (!dateValue || !timeValue) {
    alert('Please pick both a date and time! 📅⏰');
    return;
  }

  const webhookUrl = "https://discord.com/api/webhooks/1549658588539125810/qIbgnPJdtmMppwEoX7Mtm3UrKCDOLZJP-DfBV15CELNTRdErUL-aAzsGWy_nPscIjXAs";

  fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: `🎉 **Book Fair Date Confirmed!**\n📅 **Date:** ${dateValue}\n⏰ **Time:** ${timeValue}`
    })
  });

  const formattedDate = new Date(dateValue).toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
  });

  document.getElementById('displayDate').innerText = formattedDate;
  document.getElementById('displayTime').innerText = timeValue;

  nextPage(2, 3);
}

const noBtn = document.getElementById('noBtn');

function moveNoButton() {
  const container = document.querySelector('.card');
  const cardRect = container.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxLeft = cardRect.width - btnRect.width - 20;
  const maxTop = cardRect.height - btnRect.height - 20;

  const randomX = Math.floor(Math.random() * (maxLeft - 20)) + 10;
  const randomY = Math.floor(Math.random() * (maxTop - 20)) + 10;

  noBtn.style.position = 'absolute';
  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
}

noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', moveNoButton);