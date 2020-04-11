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

## Default Configuration

```
{
    // style of canvas and boundary to be plotted on to
    canvas: {
        background: { // background color of canvas
            style: 'static',
            color: '#ffffff'
        }
    },
    padding: {
        top: 30, // space between canvas and top of draw area
        bottom: 50, // space between canvas and bottom of draw area
        left: 50, // space between canvas and left of draw area
        right: 50 // space between canvas and right of draw area
    },
    boundary: {
        background: { // background color of boundary
            style: 'static',
            color: '#ffffff'
        }
    },
    yAxis: {
        width: 1, // thickness of y axis
        color: '#777777' // color of y axis
    },
    xAxis: {
        width: 1, // thickness of x axis
        color: '#777777', // color of x axis
        label: {
            font: 'Arial', // font family
            size: 12, // font size in pixel
            color: '#00000', // font color
            margin: {
                top: 4
            }
        }
    },

    // style and properties of blocks to be plotted
    blocks: {
        forceSquare: true,
        scaleX: {
            scale: [ // value and label represent in each scale
                {
                    value: 1,
                    label: '1'
                },
                {
                    value: 2,
                    label: '2'
                },
                {
                    value: 3,
                    label: '3'
                },
                {
                    value: 4,
                    label: '4'
                },
                {
                    value: 5,
                    label: '5'
                },
                {
                    value: 6,
                    label: '6'
                },
                {
                    value: 7,
                    label: '7'
                },
                {
                    value: 8,
                    label: '8'
                },
                {
                    value: 9,
                    label: '9'
                },
                {
                    value: 10,
                    label: '10'
                }
            ]
        },
        space: {
            horizontal: 4, // space between each column
            vertical: 4 // space between each blocks in vertical
        },
        groupBy: 'value', // key used to group data into same column
        background: {
            style: 'custom', // custom background color. other supported color is 'scale', 'preset-scale'
            color: '#aaaaaa', // default block background color
            scaleTo: '#eacd31' // when scale style is used, color palette will be generate from color -> scaleTo color
        },
        shadow: {
            style: 'custom', // custom shadow. other supported shadow is 'none'
            color: '#aaaaaa',
            blur: 1,
            offsetX: 1,
            offsetY: 1
        },
        border: {
            style: 'line',
            width: 2,
            color: '#000000'
        }
    }
}
```

## License

[MIT](LICENSE)