let playerHP = 100;
let playerMP = 50;
let enemies = [
    {name: "Goblin", hp: 40, mp: 20, attack: 5, defense: 3},
    {name: "Orc", hp: 60, mp: 30, attack: 13, defense: 5},
    {name: "Cavaleiro", hp: 80, mp: 40, attack: 10, defense: 15},
    {name: "Dragão", hp: 150, mp: 50, attack: 12, defense: 10}
  ];
let currentEnemies = [0]; // Inimigo inicial é o Goblin

function startGame() {
  // Limpa o array de inimigos e adiciona apenas os selecionados pelos checkboxes
  currentEnemies = [];
  let checkboxes = document.getElementsByName("enemy");
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      currentEnemies.push(parseInt(checkboxes[i].value));
    }
  }
  
  // Esconde o menu e exibe a área de jogo
  document.getElementById("menu").style.display = "none";
  document.getElementById("gameArea").style.display = "block";
  
  // Define o primeiro inimigo
  currentEnemyIndex = 0;
  updateStats();
}

function updateStats() {
  document.getElementById("playerHP").innerHTML = playerHP;
  document.getElementById("playerMP").innerHTML = playerMP;
  document.getElementById("enemyHP").innerHTML = enemies[currentEnemies[currentEnemyIndex]].hp;
  document.getElementById("enemyMP").innerHTML = enemies[currentEnemies[currentEnemyIndex]].mp;
  document.getElementById("enemyName").innerHTML = enemies[currentEnemies[currentEnemyIndex]].name;
}

function playerAttack() {
  let damage = Math.floor(Math.random() * 10) + 1;
  enemies[currentEnemies[currentEnemyIndex]].hp -= damage;
  updateStats();
  if (enemies[currentEnemies[currentEnemyIndex]].hp <= 0) {
    if (currentEnemyIndex == currentEnemies.length - 1) {
      alert("Você ganhou!");
      location.reload();
    } else {
      currentEnemyIndex++;
      updateStats();
    }
  } else {
    enemyAttack();
  }
}

function playerHeal() {
  let heal = Math.floor(Math.random() * 10) + 1;
  playerHP += heal;
  if (playerHP > 100) {
    playerHP = 100;
  }
  playerMP -= 10;
  updateStats();
  enemyAttack();
}
function playerAbility() {
    if (playerMP >= 20) {
      let damage = Math.floor(Math.random() * 20) + 5;
      let enemyDefense = enemies[currentEnemies[currentEnemyIndex]].defense;
      enemies[currentEnemies[currentEnemyIndex]].hp -= Math.max(damage - enemyDefense, 0);
      playerMP -= 20;
      updateStats();
      if (enemies[currentEnemies[currentEnemyIndex]].hp <= 0) {
        if (currentEnemyIndex == currentEnemies.length - 1) {
          alert("Você ganhou!");
          location.reload();
        } else {
          currentEnemyIndex++;
          updateStats();
        }
      } else {
        enemyAttack();
      }
    } else {
      alert("Você não tem mana suficiente para usar esta habilidade.");
    }
  }

function enemyAttack() {
  let damage = Math.floor(Math.random() * enemies[currentEnemies[currentEnemyIndex]].attack) + 1;
  playerHP -= damage;
  updateStats();
  if (playerHP <= 0) {
    alert("Você perdeu!");
    location.reload();
  }

}