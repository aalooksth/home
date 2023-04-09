function getCurrentSeconds() {
  return Math.round(new Date().getTime() / 1000.0);
}

function stripSpaces(str) {
  return str.replace(/\s/g, '');
}

function truncateTo(str, digits) {
  if (str.length <= digits) {
    return str;
  }

  return str.slice(-digits);
}

function parseURLSearch(search) {
  const queryParams = search.substr(1).split('&').reduce(function (q, query) {
    const chunks = query.split('=');
    const key = chunks[0];
    let value = decodeURIComponent(chunks[1]);
    value = isNaN(Number(value)) ? value : Number(value);
    return (q[key] = value, q);
  }, {});

  return queryParams;
}

function generateTOTP(index, key) {
  console.log(index, key);
  new Vue({
    el: '#app' + String(index),
    data: {
      secret_key: key,
      digits: 6,
      period: 30,
      updatingIn: 30,
      token: null,
      clipboardButton: null,
    },

    mounted: function () {
      this.update();
      this.intervalHandle = setInterval(this.update, 1000);
      this.clipboardButton = new ClipboardJS('#clipboard-button'+ String(index)) ;
    },

    destroyed: function () {
      clearInterval(this.intervalHandle);
    },

    computed: {
      totp: function () {
        return new OTPAuth.TOTP({
          algorithm: 'SHA1',
          digits: this.digits,
          period: this.period,
          secret: OTPAuth.Secret.fromB32(stripSpaces(this.secret_key)),
        });
      }
    },

    methods: {
      update: function () {
        this.updatingIn = this.period - (getCurrentSeconds() % this.period);
        this.token = truncateTo(this.totp.generate(), this.digits);
      },

      getKeyFromUrl: function () {
        const key = document.location.hash.replace(/[#\/]+/, '');

        if (key.length > 0) {
          this.secret_key = key;
        }
      }
    }
  })
}

count = 1
for (i in data) {
  var container = document.getElementById('otpcontainer')
  var maindiv = document.createElement('li');

  maindiv.setAttribute('class', 'box bd-link');

  var div0 = document.createElement('div'), // create DIV element
    txt0 = document.createTextNode(data[i]['issuer']+ ' ('+data[i]['account']+')'); // create text node
  div0.setAttribute('class', 'issuer has-text-grey is-size-7');
  div0.appendChild(txt0);
  maindiv.appendChild(div0);

  var div = document.createElement('span'),
    txt = document.createTextNode('{{ token }} ');
  div.appendChild(txt);
  div.setAttribute('id', 'app' + String(count));        // set DIV class attribute
  div.setAttribute('class', 'content');    // set DIV class attribute for IE (?!)
  maindiv.appendChild(div);

  var a = document.createElement('a');
  a.setAttribute('data-clipboard-target', '#app' + String(count));
  a.setAttribute('id', 'clipboard-button' + String(count));
  a.setAttribute('title', 'Copy token to clipboard');
  a.setAttribute('class', 'button is-small');

  var img = document.createElement('img');
  img.setAttribute('src', 'img/clippy.svg');
  img.setAttribute('height', '10');
  img.setAttribute('width', '10');

  a.appendChild(img);
  maindiv.appendChild(a);

  container.append(maindiv);
  // <a id="clipboard-button" data-clipboard-target="#token" title="Copy token to clipboard">
  //         <img src="img/clippy.svg" height="36" width="36">
  //       </a>
  generateTOTP(count, data[i]['secret']);
  count += 1;
}

new Vue({
  el: '#app',
  data: {
    period: 30,
    updatingIn: 30,
  },

  mounted: function () {
    this.update();

    this.intervalHandle = setInterval(this.update, 1000);
  },

  destroyed: function () {
    clearInterval(this.intervalHandle);
  },

  methods: {
    update: function () {
      this.updatingIn = this.period - (getCurrentSeconds() % this.period);
    }
  }
});