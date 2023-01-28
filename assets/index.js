const spawner = document.querySelector('.spawner');
spawner.ondragstart = () => false;
const shiftData = {
    left: 0,
    top: 0,
};

spawner.onpointerdown = function (e) {
    shiftData.left = e.clientX - spawner.getBoundingClientRect().left;
    shiftData.top = e.clientY - spawner.getBoundingClientRect().top;

    const block = createBlock(e.clientX - shiftData.left, e.clientY - shiftData.top);
    document.body.appendChild(block);
    block.setPointerCapture(e.pointerId);

    block.onpointermove = function (e) {
        setPosition(this, e.clientX - shiftData.left, e.clientY - shiftData.top);
    };
    block.onpointerup = function (e) {
        this.onpointermove = null;
        this.onpointerup = null;

        const elements = document.elementsFromPoint(e.clientX, e.clientY);
        let target = null;
        elements.forEach((element) => {
            if (element.classList.contains('target')) {
                target = element;
            }
        });

        if (target) {
            if (target.classList.contains('target_free')) {
                const posY = e.clientY - target.getBoundingClientRect().top - shiftData.top;
                const posX = e.clientX - target.getBoundingClientRect().left - shiftData.left;
                this.style.top = `${posY}px`;
                this.style.left = `${posX}px`;
            }
            target.appendChild(this);
        } else {
            document.body.removeChild(this);
        }
    };
};

function createBlock(posX, posY) {
    const block = document.createElement('div');
    block.classList.add('block');
    setPosition(block, posX, posY);
    return block;
}

function setPosition(element, x, y) {
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
}
