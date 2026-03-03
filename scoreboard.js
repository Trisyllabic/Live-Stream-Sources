(function () {
  const params = new URLSearchParams(window.location.search);

  const teamPalette = {
    FCB: '#f7d247',
    BAR: '#f7d247',
    VIL: '#ffe35a',
    RMA: '#f2d16d',
    ATM: '#f36a6a',
    SEV: '#ff6f6f',
    GIR: '#ff4f4f'
  };

  const initialState = {
    homeCode: params.get('home') || 'FCB',
    awayCode: params.get('away') || 'VIL',
    homeScore: Number.parseInt(params.get('homeScore') || '0', 10) || 0,
    awayScore: Number.parseInt(params.get('awayScore') || '0', 10) || 0,
    elapsedSeconds: parseTimeToSeconds(params.get('time') || '00:00'),
    phase: '',
    running: false
  };

  const state = { ...initialState };
  let timerId = null;

  function parseTimeToSeconds(value) {
    const text = value.trim();

    if (text.includes('+')) {
      const [base, extra] = text.split('+');
      const [baseMin, baseSec] = base.split(':').map(Number);
      const [extraMin, extraSec] = extra.split(':').map(Number);
      return (baseMin * 60 + baseSec) + (extraMin * 60 + extraSec);
    }

    const [min, sec] = text.split(':').map(Number);
    if (Number.isNaN(min) || Number.isNaN(sec)) {
      return 0;
    }

    return min * 60 + sec;
  }

  function formatClock(totalSeconds) {
    if (totalSeconds >= 90 * 60) {
      return `90:00+${formatExtra(totalSeconds - 90 * 60)}`;
    }

    if (totalSeconds >= 45 * 60) {
      return `45:00+${formatExtra(totalSeconds - 45 * 60)}`;
    }

    return formatMinutesSeconds(totalSeconds);
  }

  function formatExtra(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  }

  function formatMinutesSeconds(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  }

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach((node) => {
      node.textContent = value;
    });
  }

  function setImage(selector, key) {
    const value = params.get(key);
    if (!value) return;

    document.querySelectorAll(selector).forEach((img) => {
      img.src = value;
    });
  }

  function setTeamColors() {
    const root = document.documentElement;
    root.style.setProperty('--home-color', teamPalette[state.homeCode.toUpperCase()] || '#f4f6ff');
    root.style.setProperty('--away-color', teamPalette[state.awayCode.toUpperCase()] || '#f4f6ff');
  }

  function render() {
    setText('[data-league]', params.get('league') || 'SPANISH LA LIGA');
    setText('[data-home-code]', state.homeCode);
    setText('[data-away-code]', state.awayCode);
    setText('[data-home-score]', String(state.homeScore));
    setText('[data-away-score]', String(state.awayScore));
    setText('[data-time]', formatClock(state.elapsedSeconds));
    setText('[data-phase]', state.phase);

    const startPauseButton = document.querySelector('[data-action="startPause"]');
    if (startPauseButton) {
      startPauseButton.textContent = state.running ? 'Pause' : 'Start';
    }

    setTeamColors();
  }

  function startTimer() {
    if (timerId) return;

    timerId = setInterval(() => {
      if (!state.running) return;
      state.elapsedSeconds += 1;
      render();
    }, 1000);
  }

  function stopTimer() {
    if (!timerId) return;
    clearInterval(timerId);
    timerId = null;
  }

  function updateByAction(action) {
    switch (action) {
      case 'kickoff':
        state.homeScore = 0;
        state.awayScore = 0;
        state.elapsedSeconds = 0;
        state.phase = 'KO';
        state.running = false;
        break;
      case 'secondHalf':
        state.elapsedSeconds = 45 * 60;
        state.phase = '2H';
        state.running = false;
        break;
      case 'startPause':
        state.running = !state.running;
        if (state.running) {
          state.phase = state.phase === 'HT' || state.phase === 'FT' ? '' : state.phase;
        }
        break;
      case 'scoreReset':
        state.homeScore = 0;
        state.awayScore = 0;
        break;
      case 'homeGoal':
        state.homeScore += 1;
        break;
      case 'awayGoal':
        state.awayScore += 1;
        break;
      case 'plusMinute':
        state.elapsedSeconds += 60;
        break;
      case 'minusMinute':
        state.elapsedSeconds = Math.max(0, state.elapsedSeconds - 60);
        break;
      case 'ht':
        state.phase = 'HT';
        state.running = false;
        break;
      case 'ft':
        state.phase = 'FT';
        state.running = false;
        break;
      default:
        break;
    }

    render();
  }

  function bindControls() {
    document.querySelectorAll('[data-action]').forEach((button) => {
      button.addEventListener('click', () => {
        updateByAction(button.dataset.action);
      });
    });

    if (params.get('controls') === '0') {
      document.querySelectorAll('[data-controls]').forEach((panel) => {
        panel.style.display = 'none';
      });
    }
  }

  setImage('[data-home-logo]', 'homeLogo');
  setImage('[data-away-logo]', 'awayLogo');

  bindControls();
  startTimer();
  render();

  window.addEventListener('beforeunload', () => {
    stopTimer();
  });
})();
