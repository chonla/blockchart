import _ from 'lodash';
import chroma from 'chroma-js';

const defaultOptions = {

    // style of canvas and boundary to be plotted on to
    canvas: {
        backgroundColor: '#ffffff'
    },
    padding: {
        top: 30, // space between canvas and top of draw area
        bottom: 50, // space between canvas and bottom of draw area
        left: 50, // space between canvas and left of draw area
        right: 50 // space between canvas and right of draw area
    },
    boundary: {
        backgroundColor: '#ffffff' // background color of boundary
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
            blue: 1,
            offsetX: 1,
            offsetY: 1
        }
    },

    palettePreset: { // when background style is preset-scale, background.color will be used as name of palletPreset
        'sweet-pastel': {
            color: 'pink',
            scaleTo: '4CBBFC'
        },
        'fire': {
            color: 'yellow',
            scaleTo: 'red'
        }
    }

};

class BlockChart {

    constructor(id, options) {
        this.options = _.merge(defaultOptions, options);
        this.canvas = document.getElementById(id);
        this.context = this.canvas.getContext('2d');
        this.boundary = {
            left: this.options.padding.left,
            top: this.options.padding.top,
            width: this.canvas.clientWidth - this.options.padding.left - this.options.padding.right,
            height: this.canvas.clientHeight - this.options.padding.top - this.options.padding.bottom,
            right: this.canvas.clientWidth - this.options.padding.right,
            bottom: this.canvas.clientHeight - this.options.padding.bottom
        };
        this.blockDimension = {
            width: Math.floor((this.boundary.width - ((this.options.blocks.scaleX.scale.length - 1) * this.options.blocks.space.horizontal)) / (this.options.blocks.scaleX.scale.length + 1)),
            height: 100
        };
        this.gutterSize = Math.floor(this.blockDimension.width / 2);
        this.initialScale = this.options.blocks.scaleX.scale.map((c) => [c]);

        this.erase();
        this.drawBoundary();
        this.drawAxes();
        this.drawLabels();
    }

    erase() {
        this.context.save();

        this.context.fillStyle = this.options.canvas.backgroundColor;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.restore();
    }

    drawBoundary() {
        this.context.save();

        this.context.fillStyle = this.options.boundary.backgroundColor;
        this.context.fillRect(this.boundary.left, this.boundary.top, this.boundary.width, this.boundary.height);

        this.context.restore();
    }

    drawAxes() {
        this.context.save();
        // Y
        this.context.beginPath();
        this.context.moveTo(this.boundary.left, this.boundary.top);
        this.context.strokeStyle = this.options.yAxis.color;
        this.context.lineWidth = this.options.yAxis.width;
        this.context.lineTo(this.boundary.left, this.boundary.bottom);
        this.context.stroke();

        // X
        this.context.beginPath();
        this.context.moveTo(this.boundary.left, this.boundary.bottom);
        this.context.strokeStyle = this.options.xAxis.color;
        this.context.lineWidth = this.options.xAxis.width;
        this.context.lineTo(this.boundary.right, this.boundary.bottom);
        this.context.stroke();

        this.context.restore();
    }

    drawLabels() {
        this.context.save();

        this.context.font = `${this.options.xAxis.label.size}px ${this.options.xAxis.label.font}`.toString();
        this.context.fillStyle = this.options.xAxis.label.color;
        this.context.textAlign = 'center';

        for (let i = 0; i < this.options.blocks.scaleX.scale.length; i++) {
            this.context.fillText(this.options.blocks.scaleX.scale[i].label,
                this.boundary.left + ((this.blockDimension.width) * (i + 1) + (this.options.blocks.space.horizontal * i)),
                this.boundary.bottom + this.options.xAxis.label.size + this.options.xAxis.label.margin.top);
        }

        this.context.restore();
    }

    drawBlocks(data) {
        this.context.save();

        let colorFrom = this.options.blocks.background.color;
        let colorTo = this.options.blocks.background.color;
        switch (this.options.blocks.background.style) {
            case 'scale':
                colorFrom = this.options.blocks.background.color;
                colorTo = this.options.blocks.background.scaleTo;
                break;
            case 'preset-scale':
                colorFrom = this.options.palettePreset[this.options.blocks.background.color].color;
                colorTo = this.options.palettePreset[this.options.blocks.background.color].scaleTo;
                break;
            default:
        }
        const palette = chroma.scale([colorFrom, colorTo])
            .mode('lch').colors(data.length);

        for (let i = 0; i < data.length; i++) {
            for (let j = 1; j < data[i].length; j++) {
                const block = {
                    x: (i * (this.blockDimension.width + this.options.blocks.space.horizontal)) + this.boundary.left + this.gutterSize,
                    y: this.boundary.bottom - (j * (this.blockDimension.height + this.options.blocks.space.vertical))
                };
                this.context.fillStyle = palette[i];
                if (this.options.blocks.shadow.style === 'custom') {
                    this.context.shadowColor = this.options.blocks.shadow.color;
                    this.context.shadowBlur = this.options.blocks.shadow.blur;
                    this.context.shadowOffsetX = this.options.blocks.shadow.offsetX;
                    this.context.shadowOffsetY = this.options.blocks.shadow.offsetY;
                }
                this.context.fillRect(block.x, block.y, this.blockDimension.width, this.blockDimension.height);
            }
        }

        this.context.restore();
    }

    loadData(data) {
        this.erase();
        this.drawBoundary();

        const groups = data.reduce((a, c) => {
            const key = c[this.options.blocks.groupBy];

            for (let o in a) {
                if (a[o][0][this.options.blocks.groupBy] === key) {
                    a[o].push(c);
                }
            }
            return a;
        }, this.initialScale);

        let maxBlocksInGroup = 1;
        for (let g in groups) {
            if (groups[g].length > maxBlocksInGroup) {
                maxBlocksInGroup = groups[g].length;
            }
        }

        this.blockDimension.height = Math.floor(this.boundary.height / maxBlocksInGroup);

        if (this.options.blocks.forceSquare) {
            if (this.blockDimension.height > this.blockDimension.width) {
                this.blockDimension.height = this.blockDimension.width;
            }
        }

        this.drawBlocks(groups);

        this.drawAxes();
        this.drawLabels();
    }
}

export { BlockChart };