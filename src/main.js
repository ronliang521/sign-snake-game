import { Game } from './game.js';
    import { loadImages } from './imageLoader.js';

    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const scoreElement = document.getElementById('score');

    let game = null;
    let images = {};

    // 加载游戏所需图片
    async function init() {
      try {
        images = await loadImages({
          head: 'src/assets/dragon-head.png',
          body: 'src/assets/orange.png',
          food: 'src/assets/orange.png'
        });
        
        // 创建游戏实例
        game = new Game(canvas, ctx, images, updateScore);
        
        // 添加事件监听器
        startBtn.addEventListener('click', () => {
          game.start();
          startBtn.disabled = true;
        });
        
        restartBtn.addEventListener('click', () => {
          game.reset();
          game.start();
          startBtn.disabled = true;
          scoreElement.textContent = '0';
        });
        
        // 监听键盘事件
        window.addEventListener('keydown', (e) => {
          game.handleKeyPress(e.key);
        });
        
        // 初始绘制游戏
        game.draw();
        
      } catch (error) {
        console.error('加载图片失败:', error);
      }
    }

    function updateScore(score) {
      scoreElement.textContent = score.toString();
    }

    // 初始化游戏
    init();
