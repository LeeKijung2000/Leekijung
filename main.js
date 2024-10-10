let ranks = [];
let probabilities = [];
let currentRankIndex = 0;

// CSV 파일에서 데이터 읽기
fetch('ranks.csv')
  .then(response => response.text())
  .then(data => {
    const rows = data.split('\n');
    for (let i = 1; i < rows.length; i++) { // 첫 번째 줄은 헤더
      const [rank, probability] = rows[i].split(',');
      if (rank && probability) {
        ranks.push(rank.trim());
        probabilities.push(parseFloat(probability.trim()));
      }
    }
    updateUI(); // 데이터가 로드된 후 UI 업데이트
  })
  .catch(error => console.error('Error loading the CSV file:', error));

function updateUI() {
  document.getElementById("rank").textContent = ranks[currentRankIndex];
  document.getElementById("rankImage").src = `images/${currentRankIndex + 1}.png`;
  document.getElementById("successRate").textContent = `성공 확률: ${(probabilities[currentRankIndex] * 100).toFixed(2)}%`;
}

document.getElementById("promoteButton").addEventListener("click", function() {
  if (currentRankIndex >= ranks.length - 1) {
    document.getElementById("message").textContent = "축하합니다! 최종 계급에 도달했습니다.";
    return;
  }

  const successProbability = probabilities[currentRankIndex];

  if (Math.random() < successProbability) {
    currentRankIndex++;
    document.getElementById("message").textContent = "승급 성공!";
  } else {
    currentRankIndex = 0;  // 실패 시 훈련병으로 복구
    document.getElementById("message").textContent = "승급 실패! 훈련병으로 돌아갑니다.";
  }

  updateUI();
});

// 페이지 로드 시 UI 업데이트
