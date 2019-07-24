const irmaVote = {
  voteHost: "",
  init: function(config) {
    this.voteHost = `${config.node}${
      config.port == 80 ? "" : `:${config.port}`
    }`;
  },

  getConfig: async function() {
    const response = await fetch("/config", {
      mode: "cors"
    });
    return await response.json();
  },

  isMobile: function() {
    return (
      /Android/i.test(window.navigator.userAgent) ||
      /iPad|iPhone|iPod/.test(navigator.userAgent)
    );
  },

  checkDbError: async function() {
    const response = await fetch(`${this.voteHost}/stats`, {
      mode: "cors"
    });
    const json = await response.json();

    return json.error;
  },

  sendVote: async function(identifier, vote) {
    const response = await fetch(`${this.voteHost}/vote`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ identifier, vote }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    return await response.json();
  },

  fetchPoll: async function() {
    let result = { total: 0, votes: [] };

    const response = await fetch(`${this.voteHost}/stats`, {
      mode: "cors"
    });
    let json = await response.json();

    result.total = config.voting_options.reduce(
      (acc, item) => acc + (json.votes[item] || 0),
      0
    );

    config.voting_options.forEach(item => {
      result.votes[item] = {
        number: json.votes[item],
        perc:
          result.total == 0
            ? 0
            : Math.round((100 * (json.votes[item] || 0)) / result.total)
      };
    });

    return result;
  },

  irmaSession: async function(config, element, popupCallback) {
    const irmaResponse = await fetch(`${this.voteHost}/getsession`, {
      mode: "cors"
    });

    const session = await irmaResponse.json();

    const { sessionPtr, token } = session;

    const sessionOptions = {
      method: "canvas",
      element,
      showConnectedIcon: true,
      server: config.irma,
      token,
      language: "nl"
    };

    if (this.isMobile()) {
      sessionOptions.method = "mobile";
    } else {
      popupCallback();
    }

    return await irma.handleSession(sessionPtr, sessionOptions);
  }
};
