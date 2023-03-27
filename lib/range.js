function Range(data) {
  const self = this;
  // Property //
  this.selector = data.name;

  if (data.hasOwnProperty('disabled') && data.disabled === true) {
    this.disabled = true;
  }
  else {
    this.disabled = false;
  }

  this.type = data.type;
  this.init = data.init;
  this.min = this.init.min ? this.init.min : 0;
  this.max = this.init.max ? this.init.max : 100;
  this.defaultMin = this.init.defaultMin ? this.init.defaultMin : 0;
  this.leftX = (this.defaultMin / this.max) * 100;

  if (this.type === "multi") {
    this.defaultMax = this.init.defaultMax ? this.init.defaultMax : 0;
    this.rightX = 100 - (this.defaultMax / this.max) * 100;
  }

  this.dragOnLeft = false;
  this.dragOnRight = false;

  // element //
  this.rangeContainer = document.querySelector(this.selector);
  this.track = this.rangeContainer.querySelector(".track-range-swCustomUI");
  this.rangeBar = this.rangeContainer.querySelector(".range-swCustomUI");
  this.printValue = this.rangeContainer.querySelector(".print-value");
  this.printdefaultMinValue = this.rangeContainer.querySelector(".value-start");
  this.printdefaultMaxValue = this.rangeContainer.querySelector(".value-end");
  this.printdefaultMinValue.textContent = this.min;
  this.printdefaultMaxValue.textContent = this.max;

  let minValue, maxValue, thumbWidth, thumbRatio;
  let trackWidth = this.track.offsetWidth;

  this.realRangeLeft = this.rangeContainer.querySelector(".input-left");
  this.leftThumb = this.rangeContainer.querySelector(
    ".thumb-range-swCustomUI.thumb-left"
  );
  minValue = this.max * (this.defaultMin / this.max);
  thumbWidth = this.leftThumb.offsetWidth;
  thumbRatio = floorDecimalPoint(thumbWidth / trackWidth, 3) * 100;

  if (this.leftX - thumbRatio >= 0) {
    this.leftThumb.style.cssText = `
      left: ${this.leftX - thumbRatio}%;
    `;
  }
  else {
    this.leftThumb.style.cssText = `
      left: ${this.leftX}%;
    `;
  }

  this.realRangeLeft.value = this.leftX;

  if (this.printValue) {
    this.printValue.textContent = minValue.toLocaleString();
  }

  if (this.type === "single") {
    this.rangeBar.style.cssText = `
      left: 0%;
      right: ${100 - this.leftX}%;
    `;

  } else if (this.type === "multi") {
    this.realRangeRight = this.rangeContainer.querySelector(".input-right");
    this.rightThumb = this.rangeContainer.querySelector(
      ".thumb-range-swCustomUI.thumb-right"
    );
    maxValue = this.max * (this.defaultMax / this.max);
    this.realRangeRight.value = 100 - this.rightX;

    if (this.printValue) {
      this.printValue.textContent = `${minValue.toLocaleString()} - ${maxValue.toLocaleString()}`;
    }

    this.rightThumb.style.cssText = `
      right: ${this.rightX}%;
    `;

    if (this.leftX - thumbRatio >= 0) {
      this.rangeBar.style.cssText = `
        left: ${this.leftX - thumbRatio}%;
        right: ${this.rightX}%;
      `;
    }
    else {
      this.rangeBar.style.cssText = `
        left: ${this.leftX}%;
        right: ${this.rightX}%;
      `;
    }
  }

  function thumbStartMoving(event) {
    if (!self.disabled) {
      // 텍스트 선택 영역을 해제한다. //
      window.getSelection().removeAllRanges();

      const target = event.target;
      const targetClass = target.className;
      const rangeContainer = target.closest(".range-container");

      if (rangeContainer != null) {
        const rangeClass = rangeContainer.className;

        // 왼쪽 버튼 클릭 //
        if (
          rangeClass &&
          rangeClass.indexOf(self.selector.replace(".", "")) > -1 &&
          targetClass.indexOf("thumb-left") > -1
        ) {
          self.dragOnLeft = true;

          if (self.type === "multi") {
            self.dragOnRight = false;
          }
        }
        // 오른쪽 버튼 클릭 //
        else if (
          rangeClass &&
          rangeClass.indexOf(self.selector.replace(".", "")) > -1 &&
          targetClass.indexOf("thumb-right") > -1
        ) {
          self.dragOnLeft = false;
          self.dragOnRight = true;
        }
      }
    }
    event.stopPropagation();
  }

  function thumbMoving(event) {
    if (!self.disabled) {
      // 텍스트 선택 영역을 해제한다. //
      window.getSelection().removeAllRanges();

      let trackWidth = self.track.offsetWidth;
      let moveX = 0;

      if(event.type === 'mousemove') {
        moveX = event.pageX - self.track.getBoundingClientRect().left;
      } else if(event.type === 'touchmove') {
        moveX = event.changedTouches[0].pageX - self.track.getBoundingClientRect().left;
      } else {
        return;
      }

      // 값이 범위를 벗어날 경우 최소/최대 값을 적용한다. //
      if (moveX < 0) {
        moveX = 0;
      } else if (moveX > trackWidth) {
        moveX = trackWidth;
      }

      // 최소값 조절 중 //
      if (self.dragOnLeft) {
        self.leftX = (moveX / (trackWidth + thumbWidth)) * 100;

        if (self.leftX >= 100 - (self.rightX + thumbRatio)) {
          self.leftX = 100 - (self.rightX + thumbRatio);
        } else {
          minValue = self.max * (moveX / trackWidth);
          minValue = Math.floor(minValue);

          self.realRangeLeft.value = self.leftX;

          if (self.type === "single") {
            if (self.printValue) {
              self.printValue.textContent = minValue.toLocaleString();
            }

            self.rangeBar.style.cssText = `
              left: 0%;
              right: ${100 - (self.leftX + thumbRatio)}%;
            `;
          } else if (self.type === "multi") {
            if (self.printValue) {
              self.printValue.textContent = `${minValue.toLocaleString()} - ${maxValue.toLocaleString()}`;
            }

            self.rangeBar.style.cssText = `
              left: ${self.leftX}%;
              right: ${self.rightX}%;
            `;
          }
        }

        self.leftThumb.style.cssText = `
          left: ${self.leftX}%;
        `;
      }

      // 최대값 조절 중 //
      if (self.dragOnRight) {
        self.rightX = ((trackWidth - moveX) / (trackWidth + thumbWidth)) * 100;

        if (100 - self.rightX <= (self.leftX + thumbRatio)) {
          self.rightX = 100 - (self.leftX + thumbRatio);
        } else {
          maxValue = self.max * (moveX / trackWidth);
          maxValue = Math.floor(maxValue);
          if (self.printValue) {
            self.printValue.textContent = `${minValue.toLocaleString()} - ${maxValue.toLocaleString()}`;
          }
          self.realRangeRight.value = 100 - self.rightX;
        }

        self.rightThumb.style.cssText = `
          right: ${self.rightX}%;
        `;

        self.rangeBar.style.cssText = `
            left: ${self.leftX}%;
            right: ${self.rightX}%;
        `;
      }
    }
    event.stopPropagation();
  }

  function thumbFinishMovind(event) {
    if (!self.disabled) {
      window.getSelection().removeAllRanges();

      let fireEvent = new Event("input", {
        bubbles: true,
        cancelable: true,
      });

      if (self.dragOnLeft) {
        self.realRangeLeft.dispatchEvent(fireEvent);
      } else if (self.dragOnRight) {
        self.realRangeRight.dispatchEvent(fireEvent);
      }

      self.dragOnLeft = false;
      self.dragOnRight = false;

      // console.log(self.realRangeLeft);
    }

    event.stopPropagation();
  }

  window.addEventListener("mousedown", thumbStartMoving, false);
  window.addEventListener("touchstart", thumbStartMoving, false);

  window.addEventListener("mousemove", thumbMoving, false);
  window.addEventListener("touchmove", thumbMoving, false);

  window.addEventListener("mouseup", thumbFinishMovind, false);
  window.addEventListener("touchend", thumbFinishMovind, false);

  // 소수점 해당 자릿수 이하 버림 //
  function floorDecimalPoint(value, floorCount) {
    let floorRange = 10 ** floorCount;
    let floorValue = value * floorRange;
    return Math.floor(floorValue) / floorRange;
  };
}

Range.prototype.setMinValue = function (setValue) {
  this.leftX = (setValue / this.max) * 100;

  if (this.leftX >= 100 - this.rightX) {
    this.leftX = 100 - this.rightX;
    this.printRangeLeft.textContent = setValue.toLocaleString();
  } else {
    this.minValue = setValue;
    this.printRangeLeft.textContent = this.minValue.toLocaleString();
    this.realRangeLeft.value = this.leftX;
  }

  this.leftThumb.style.cssText = `
        left: ${this.leftX}%;
    `;

  this.rangeBar.style.cssText = `
        left: ${this.leftX}%;
        right: ${this.rightX}%;
    `;
};

Range.prototype.setMaxValue = function (setValue) {
  this.rightX = ((this.max - setValue) / this.max) * 100;

  if (100 - this.rightX <= this.leftX) {
    this.rightX = 100 - this.leftX;
  } else {
    this.maxValue = setValue;
    this.printRangeRight.textContent = this.maxValue.toLocaleString();
    this.realRangeRight.value = 100 - this.rightX;
  }

  this.rightThumb.style.cssText = `
        right: calc(${this.rightX}% - 10px);
    `;

  this.rangeBar.style.cssText = `
        left: ${this.leftX}%;
        right: ${this.rightX}%;
    `;
};

Range.prototype.getMinValue = function (setValue) {
  return this.maxValue;
};

Range.prototype.getMaxValue = function (setValue) {
  return this.maxValue;
};

export default Range;
