const initBasicSlider = () => {
  // Initialize basic slider.
  const slider = document.getElementById('basicSlider');
  const valueMin = document.getElementById('basicSliderMin');
  const valueMax = document.getElementById('basicSliderMax');

  noUiSlider.create(slider, {
    start: [20, 80],
    connect: true,
    range: {
      min: 0,
      max: 100
    }
  });

  slider.noUiSlider.on('update', (values, handle) => {
    if (handle)
      valueMax.innerHTML = values[handle];
    else
      valueMin.innerHTML = values[handle];
  });
}

const initSmallSlider = () => {
  const slider = document.getElementById('smallSlider');
  noUiSlider.create(slider, {
    start: [20, 80],
    connect: true,
    range: {
      min: 0,
      max: 100
    }
  });
}

const initNormalSizeSlider = () => {
  const slider = document.getElementById('normalSizeSlider');
  noUiSlider.create(slider, {
    start: [20, 80],
    connect: true,
    range: {
      min: 0,
      max: 100
    }
  });
}

const initLargeSlider = () => {
  const slider = document.getElementById('largeSlider');
  noUiSlider.create(slider, {
    start: [20, 80],
    connect: true,
    range: {
      min: 0,
      max: 100
    }
  });
}

const initVerticalSlider = () => {
  // Initialize vertical slider.
  const slider = document.getElementById('verticalSlider');
  noUiSlider.create(slider, {
    start: [60, 160],
    connect: true,
    orientation: 'vertical',
    range: {
      min: 0,
      max: 200
    }
  });
}

const initTooltipSlider = () => {
  // Initialize tooltip slider.
  const slider = document.getElementById('tooltipSlider');
  noUiSlider.create(slider, {
    start: [20, 80, 120],
    tooltips: [false, wNumb({decimals: 1}), true],
    range: {
      min: 0,
      max: 200
    }
  });
}

const initSoftLimitsSlider = () => {
  // Initialize soft limits slider.
  const slider = document.getElementById('softLimitsSlider');
  noUiSlider.create(slider, {
    start: [50],
    range: {
      min: 0,
      max: 100
    },
    pips: {
      mode: 'values',
      values: [20, 80],
      density: 4
    }
  });
}

// Initialize the component and set up event listeners.
initBasicSlider();
initSmallSlider();
initNormalSizeSlider();
initLargeSlider();
initVerticalSlider();
initTooltipSlider();
initSoftLimitsSlider();