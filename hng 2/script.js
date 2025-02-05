let score = 0;
        let targetColor;
        let isGameActive = true;

        // Show modal on page load
        const modal = document.getElementById('instructionModal');
        modal.style.display = 'flex';

        // Start game when modal button is clicked
        document.getElementById('startGameButton').addEventListener('click', () => {
            modal.style.display = 'none';
            initializeGame();
        });

        function generateColor() {
            return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
        }

        function createColorOptions() {
            const options = [targetColor];
            
            while(options.length < 6) {
                const color = generateColor();
                if (!options.includes(color)) {
                    options.push(color);
                }
            }
            
            return options.sort(() => Math.random() - 0.5);
        }

        function initializeGame() {
            isGameActive = true;
            targetColor = generateColor();
            document.getElementById('colorBox').style.backgroundColor = '#f0f0f0';
            
            const colorOptions = createColorOptions();
            const optionsContainer = document.getElementById('colorOptions');
            optionsContainer.innerHTML = '';

            colorOptions.forEach(color => {
                const button = document.createElement('button');
                button.className = 'color-option';
                button.style.backgroundColor = color;
                button.dataset.testid = 'colorOption';
                button.addEventListener('click', handleColorClick);
                optionsContainer.appendChild(button);
            });

            document.getElementById('gameStatus').textContent = '';
        }

        function handleColorClick(event) {
            if (!isGameActive) return;

            const selectedColor = event.target.style.backgroundColor;
            const statusElement = document.getElementById('gameStatus');

            if (selectedColor === hexToRgb(targetColor)) {
                score++;
                document.getElementById('score').textContent = `Score: ${score}`;
                statusElement.textContent = 'Correct! Well done! 🎉';
                statusElement.style.color = 'green';
                event.target.classList.add('correct');
                document.getElementById('colorBox').style.backgroundColor = targetColor;
                isGameActive = false;
            } else {
                score = 0; // Reset score on wrong guess
                document.getElementById('score').textContent = `Score: ${score}`;
                statusElement.textContent = 'Wrong! Try again! 😢';
                statusElement.style.color = 'red';
                event.target.classList.add('wrong');
            }

            setTimeout(() => {
                event.target.classList.remove('correct', 'wrong');
            }, 500);
        }

        function hexToRgb(hex) {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgb(${r}, ${g}, ${b})`;
        }

        document.getElementById('newGameButton').addEventListener('click', () => {
            initializeGame();
        });