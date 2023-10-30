function initBasicSlider() {
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

function initSmallSlider() {
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

function initNormalSizeSlider() {
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

function initLargeSlider() {
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

function initVerticalSlider() {
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

function initTooltipSlider() {
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

function initSoftLimitsSlider() {
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

// Initialize basic slider.
initBasicSlider();

// Initialize small slider.
initSmallSlider();

// Initialize large slider.
initNormalSizeSlider();

// Initialize normal size slider.
initLargeSlider();

// Initialize vertical slider.
initVerticalSlider();

// Initialize tooltip slider.
initTooltipSlider();

// Initialize soft limits slider.
initSoftLimitsSlider();
