function Sheet(data) {
  const self = this;
  this.state = data.state;
  console.log('name = ', data.name);
  this.selector = document.querySelector(data.name);
  console.log('selector = ', this.selector);
  this.container = this.selector.closest('.bottom-sheet-container');
  this.handler = this.selector.querySelector('.handle-bar');
  this.dim = this.container.querySelector('.dim');
  this.trigger = data.trigger;
  this.maxHeight = 740;

  if (data.hasOwnProperty('trigger')) {
    this.trigger = data.trigger;
  }
  else {
    this.trigger = 370;
  }

  let active = false;
  let startY = 0;
  let moveY = 0;
  let startBottom = 0;
  let currentBottom = 0;
  let sheetHeight = this.selector.offsetHeight;
  let startTime = 0;
  let endTime = 0;
  let speed = 0;
  let oldMoveY = 0;

  const handlerHeight = 25;
  let delay = 0.25;
  const opacity = 0.3;

  if (this.state == 'show') {
    this.selector.style.cssText = `
      bottom: 0px;
    `;

    this.dim.style.cssText = `
      opacity: ${opacity};
    `;
  }

  else if (this.state == 'hide') {
    this.selector.style.cssText = `
      bottom: -${sheetHeight - handlerHeight}px;
    `;

    this.dim.style.cssText = `
      opacity: 0;
    `;
    currentBottom = sheetHeight - handlerHeight;
  }


  this.handler.addEventListener('mousedown', startHandling);
  this.handler.addEventListener('touchstart', startHandling);

  window.addEventListener("mousemove", handling);
  window.addEventListener("touchmove", handling);

  window.addEventListener("mouseup", endHandling);
  window.addEventListener("touchend", endHandling);

  // 마우스 다운 이벤트 핸들러 //
  function startHandling(e) {
    active = true;
    startY = e.pageY;
    startTime = Date.now();
  }

  // 마우스 무브 이벤트 핸들러 //
  function handling(e) {
    if (active) {
      window.getSelection().removeAllRanges();
      moveY = e.pageY - startY;

      let styleProperties = window.getComputedStyle(self.selector);
      let computedHeight = Number(styleProperties.height.replace('px', ''));
      let computedBottom = Number(styleProperties.bottom.replace('px', ''));
      let direction = oldMoveY - moveY;

      // console.log('currentBottom = ', currentBottom);
      // console.log('moveY = ', moveY);
      // console.log('sheetHeight = ', sheetHeight);
      // console.log('handlerHeight = ', handlerHeight);
      // console.log('computedHeight = ', computedHeight);
      // console.log('computedBottom = ', computedBottom);
      // console.log('direction = ', direction);
      // console.log('-------------------');

      if (currentBottom + moveY < sheetHeight - handlerHeight) {
        let correctHeight = sheetHeight - handlerHeight;
        let opacityHeight = correctHeight - (currentBottom + moveY);
        let opacityRatio = opacityHeight / correctHeight;

        if (opacityRatio > 1) {
          opacityRatio = 1;
        }


        if (direction > 0) {
          if (computedHeight >= self.trigger && computedBottom === 0) {
            self.selector.style.cssText = `
              bottom: 0px;
              height: ${sheetHeight + ((currentBottom + moveY) * -1)}px;
            `;
          }
          else {
            self.selector.style.cssText = `
              bottom: -${currentBottom + moveY}px;
              height: ${self.trigger}px;
              `;
          }
        }
        else {
          if (computedHeight > self.trigger && computedBottom === 0) {
            self.selector.style.cssText = `
              bottom: 0px;
              height: ${sheetHeight + ((currentBottom + moveY) * -1)}px;
            `;
          }
          else {
            // if(moveY >= self.trigger) moveY = moveY - self.trigger;
            if (moveY >= self.maxHeight - self.trigger) moveY = moveY - (self.maxHeight - self.trigger);
            self.selector.style.cssText = `
              bottom: -${currentBottom + moveY}px;
              height: ${self.trigger}px;
              `;
          }
        }

        self.dim.style.cssText = `
          opacity: ${opacity * opacityRatio};
        `;
      }
      oldMoveY = moveY;
    }
  }

  // 마우스 업 이벤트 핸들러 //
  function endHandling(e) {
    if (active) {
      currentBottom += moveY;
      endTime = Date.now();
      speed = moveY / (endTime - startTime);

      let styleProperties = window.getComputedStyle(self.selector);
      let computedHeight = Number(styleProperties.height.replace('px', ''));
      let computedBottom = Number(styleProperties.bottom.replace('px', ''));

      if (speed > 0.2) {
        if (sheetHeight > self.trigger) {
          self.selector.style.cssText = `
            height: ${self.trigger}px;
            bottom: 0;
            transition: height ${delay}s;
          `;

          sheetHeight = self.trigger;
          currentBottom = 0;
        }
        else {
          self.selector.style.cssText = `
            height: ${self.trigger}px;
            bottom: -${self.trigger - handlerHeight}px;
            transition: bottom ${delay}s;
          `;

          self.dim.style.cssText = `
            opacity: 0;
            transition: opacity ${delay}s;
          `;

          sheetHeight = self.trigger;
          currentBottom = self.trigger - handlerHeight;
        }
      }
      else if (speed < -0.2) {
        if (computedBottom < 0) {
          self.selector.style.cssText = `
            height: ${self.trigger}px;
            bottom: 0px;
            transition: bottom ${delay}s;
          `;

          self.dim.style.cssText = `
            opacity: ${opacity};
            transition: opacity ${delay}s;
          `;

          sheetHeight = self.trigger;
          currentBottom = self.trigger - handlerHeight;
        }
        else if (computedBottom >= 0) {
          self.selector.style.cssText = `
            height: 788px;
            bottom: 0;
            transition: height ${delay}s;
          `;

          sheetHeight = 788;
          currentBottom = 0;
        }

        currentBottom = 0;
      }
      else {
        if (computedHeight > self.trigger + 185) {
          self.selector.style.cssText = `
            height: ${self.maxHeight}px;
            bottom: 0px;
            transition: height ${delay}s;
          `;

          sheetHeight = self.maxHeight;
          currentBottom = 0;
        }
        else if (computedHeight > self.trigger && computedHeight <= self.trigger + 185) {
          self.selector.style.cssText = `
            height: ${self.trigger}px;
            bottom: 0px;
            transition: height ${delay}s;
          `;

          sheetHeight = self.trigger;
          currentBottom = 0;
        }
        else {
          if (computedBottom > -(self.trigger / 2)) {
            self.selector.style.cssText = `
              height: ${self.trigger}px;
              bottom: 0px;
              transition: bottom ${delay}s;
            `;

            sheetHeight = self.trigger;
            currentBottom = 0;
          }

          if (computedBottom <= -(self.trigger / 2)) {
            self.selector.style.cssText = `
              height: ${self.trigger}px;
              bottom: -${self.trigger - handlerHeight}px;
              transition: bottom ${delay}s;
            `;

            sheetHeight = self.trigger;
            currentBottom = self.trigger - handlerHeight;
          }
        }
      }

      active = false;
      moveY = 0;
    }
  }
}