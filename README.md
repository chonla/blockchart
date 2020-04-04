# Block Chart JS

Block Chart JS draws block chart in HTML canvas.

## Usage

### npm

```
npm install @chonla/blockchart
```

### cdn

```
https://cdn.jsdelivr.net/gh/chonla/blockchart@1.0.0/dist/blockchart.min.js
```

### HTML

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Block Chart Demo</title>
    <style>
        canvas {
            border: 1px solid #c3c3c3;
        }
    </style>
</head>

<body>
    <canvas id="myCanvas" width="800" height="500"></canvas>
    <script src="./blockchart.min.js"></script>
    <script type="text/javascript">
        window.onload = () => {
            var chart = new BlockChart('myCanvas', {
                blocks: {
                    background: {
                        style: 'preset-scale',
                        color: 'sweet-pastel'
                    },
                    shadow: {
                        style: 'custom'
                    }
                }
            });

            chart.loadData([{
                    value: 3,
                    title: 'ok'
                },
                {
                    value: 1,
                    title: 'not ok'
                },
                {
                    value: 8,
                    title: 'awesome'
                },
                {
                    value: 3,
                    title: 'so so'
                },
                {
                    value: 9,
                    title: 'so so'
                },
                {
                    value: 9,
                    title: 'so so'
                },
                {
                    value: 9,
                    title: 'so so'
                },
                {
                    value: 9,
                    title: 'so so'
                },
                {
                    value: 9,
                    title: 'so so'
                },
                {
                    value: 10,
                    title: 'wonderful'
                },
                {
                    value: 2,
                    title: 'well'
                },
                {
                    value: 3,
                    title: 'nice'
                }
            ]);
        };
    </script>
</body>

</html>
```

## License

[MIT](LICENSE)