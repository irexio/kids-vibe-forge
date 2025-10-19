-- Create tutorials table
CREATE TABLE public.tutorials (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text NOT NULL,
  tier text NOT NULL DEFAULT 'free' CHECK (tier IN ('free', 'paid')),
  difficulty integer NOT NULL DEFAULT 1 CHECK (difficulty >= 1 AND difficulty <= 5),
  category text,
  free_content text NOT NULL,
  paid_content text,
  starter_code text,
  preview_image text,
  order_index integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tutorials ENABLE ROW LEVEL SECURITY;

-- Everyone can view tutorials (we'll control paid content in the app)
CREATE POLICY "Tutorials are viewable by everyone"
ON public.tutorials
FOR SELECT
USING (true);

-- Only admins can manage tutorials
CREATE POLICY "Admins can manage tutorials"
ON public.tutorials
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_tutorials_updated_at
BEFORE UPDATE ON public.tutorials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample tutorials
INSERT INTO public.tutorials (title, slug, description, tier, difficulty, category, free_content, paid_content, starter_code, order_index) VALUES
(
  'Your First Masterpiece',
  'first-masterpiece',
  'Create a beautiful digital landscape with sky, grass, sun, and a house. Learn the basics of drawing on a canvas!',
  'free',
  1,
  'Art & Animation',
  '# Your First Masterpiece

Welcome to your first coding adventure! Today, you''ll create a beautiful landscape scene.

## What You''ll Build
A complete digital artwork with:
- A blue sky
- Green grass
- A bright sun
- A simple house

## Step 1: Set Up Your Canvas
First, let''s create our drawing space:

```javascript
const canvas = document.getElementById(''canvas'');
const ctx = canvas.getContext(''2d'');
```

## Step 2: Draw the Sky
Paint the top half blue:

```javascript
ctx.fillStyle = ''#87CEEB'';
ctx.fillRect(0, 0, 800, 300);
```

## Step 3: Draw the Grass
Paint the bottom half green:

```javascript
ctx.fillStyle = ''#90EE90'';
ctx.fillRect(0, 300, 800, 300);
```

## Step 4: Draw the Sun
Add a yellow circle in the sky:

```javascript
ctx.fillStyle = ''#FFD700'';
ctx.beginPath();
ctx.arc(650, 100, 50, 0, Math.PI * 2);
ctx.fill();
```

## Step 5: Draw a House
Create a simple house with a roof:

```javascript
// House body
ctx.fillStyle = ''#8B4513'';
ctx.fillRect(250, 350, 200, 150);

// Roof
ctx.fillStyle = ''#DC143C'';
ctx.beginPath();
ctx.moveTo(250, 350);
ctx.lineTo(350, 280);
ctx.lineTo(450, 350);
ctx.fill();
```

🎉 **You did it!** You''ve created your first digital masterpiece!',
  '# Level Up! 🚀

Now let''s make your landscape come alive with animation and interactivity!

## Enhancement 1: Animated Sunset
Make the sun slowly set over the horizon:

```javascript
let sunY = 100;

function animateSunset() {
  // Clear and redraw
  ctx.clearRect(0, 0, 800, 600);
  
  // Redraw sky (getting darker)
  const skyColor = `hsl(200, 70%, ${70 - sunY/10}%)`;
  ctx.fillStyle = skyColor;
  ctx.fillRect(0, 0, 800, 300);
  
  // Redraw grass
  ctx.fillStyle = ''#90EE90'';
  ctx.fillRect(0, 300, 800, 300);
  
  // Animated sun
  ctx.fillStyle = ''#FFD700'';
  ctx.beginPath();
  ctx.arc(650, sunY, 50, 0, Math.PI * 2);
  ctx.fill();
  
  // Redraw house
  ctx.fillStyle = ''#8B4513'';
  ctx.fillRect(250, 350, 200, 150);
  ctx.fillStyle = ''#DC143C'';
  ctx.beginPath();
  ctx.moveTo(250, 350);
  ctx.lineTo(350, 280);
  ctx.lineTo(450, 350);
  ctx.fill();
  
  sunY += 0.5;
  if (sunY < 400) {
    requestAnimationFrame(animateSunset);
  } else {
    addStars();
  }
}

animateSunset();
```

## Enhancement 2: Twinkling Stars
When the sun sets, add stars:

```javascript
function addStars() {
  ctx.fillStyle = ''#1a1a2e'';
  ctx.fillRect(0, 0, 800, 300);
  
  for (let i = 0; i < 50; i++) {
    ctx.fillStyle = ''#FFFFFF'';
    ctx.beginPath();
    ctx.arc(
      Math.random() * 800,
      Math.random() * 300,
      Math.random() * 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
}
```

## Enhancement 3: Upload Your Own Image
Add a custom pet in the window!

```javascript
// This feature unlocks file upload in the editor
const petImg = new Image();
petImg.src = ''your-uploaded-image.jpg'';
petImg.onload = () => {
  ctx.drawImage(petImg, 320, 400, 60, 60);
};
```

🌟 **Amazing!** You''ve created an animated, interactive masterpiece!',
  '<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f0f0f0; }
    canvas { border: 2px solid #333; background: white; }
  </style>
</head>
<body>
  <canvas id="canvas" width="800" height="600"></canvas>
  <script>
    const canvas = document.getElementById(''canvas'');
    const ctx = canvas.getContext(''2d'');
    
    // Your code here!
    
  </script>
</body>
</html>',
  1
),
(
  'Make it Move! Bouncing Ball',
  'bouncing-ball',
  'Create your first animation! Watch a colorful ball bounce around the screen with realistic physics.',
  'free',
  2,
  'Animation',
  '# Make it Move! Bouncing Ball

Let''s bring your code to life with animation! You''ll create a ball that bounces realistically off all four walls.

## What You''ll Build
A canvas with a ball that:
- Moves continuously
- Bounces off walls
- Uses real physics

## Step 1: Create the Ball
Define your ball object:

```javascript
const ball = {
  x: 400,
  y: 300,
  radius: 20,
  speedX: 3,
  speedY: 2,
  color: ''#FF6B6B''
};
```

## Step 2: Draw the Ball
Create a function to draw it:

```javascript
function drawBall() {
  ctx.fillStyle = ball.color;
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fill();
}
```

## Step 3: Move the Ball
Update the ball''s position:

```javascript
function moveBall() {
  ball.x += ball.speedX;
  ball.y += ball.speedY;
}
```

## Step 4: Check for Wall Collisions
Make it bounce!

```javascript
function checkWalls() {
  // Left or right wall
  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.speedX = -ball.speedX;
  }
  
  // Top or bottom wall
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.speedY = -ball.speedY;
  }
}
```

## Step 5: Animation Loop
Put it all together:

```javascript
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  drawBall();
  moveBall();
  checkWalls();
  
  requestAnimationFrame(animate);
}

animate();
```

🎉 **It''s moving!** You''ve created your first animation!',
  '# Level Up! 🚀

Let''s make this way more fun with colors, multiple balls, and controls!

## Enhancement 1: Color-Changing Ball
Make the ball change color on each bounce:

```javascript
function getRandomColor() {
  const colors = [''#FF6B6B'', ''#4ECDC4'', ''#45B7D1'', ''#FFA07A'', ''#98D8C8''];
  return colors[Math.floor(Math.random() * colors.length)];
}

function checkWalls() {
  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.speedX = -ball.speedX;
    ball.color = getRandomColor(); // Color change!
  }
  
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.speedY = -ball.speedY;
    ball.color = getRandomColor(); // Color change!
  }
}
```

## Enhancement 2: Multiple Balls
Add more balls with a click:

```javascript
const balls = [ball]; // Array of balls

canvas.addEventListener(''click'', (e) => {
  const rect = canvas.getBoundingClientRect();
  balls.push({
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
    radius: 20,
    speedX: (Math.random() - 0.5) * 6,
    speedY: (Math.random() - 0.5) * 6,
    color: getRandomColor()
  });
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  balls.forEach(ball => {
    drawBall(ball);
    moveBall(ball);
    checkWalls(ball);
  });
  
  requestAnimationFrame(animate);
}
```

## Enhancement 3: Add a Paddle
Control a paddle with your mouse:

```javascript
const paddle = {
  x: 350,
  y: 550,
  width: 100,
  height: 10,
  color: ''#333''
};

canvas.addEventListener(''mousemove'', (e) => {
  const rect = canvas.getBoundingClientRect();
  paddle.x = e.clientX - rect.left - paddle.width / 2;
});

function drawPaddle() {
  ctx.fillStyle = paddle.color;
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function checkPaddleCollision(ball) {
  if (ball.y + ball.radius > paddle.y &&
      ball.x > paddle.x &&
      ball.x < paddle.x + paddle.width) {
    ball.speedY = -Math.abs(ball.speedY);
  }
}
```

🎮 **You''re a game developer now!**',
  '<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f0f0f0; }
    canvas { border: 2px solid #333; background: white; }
  </style>
</head>
<body>
  <canvas id="canvas" width="800" height="600"></canvas>
  <script>
    const canvas = document.getElementById(''canvas'');
    const ctx = canvas.getContext(''2d'');
    
    // Your code here!
    
  </script>
</body>
</html>',
  2
);
