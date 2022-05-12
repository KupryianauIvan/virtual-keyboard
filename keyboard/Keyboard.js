
const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    heading: null,
    paragraph: null,
    textarea: null,
    keys: []
  },

  eventHandlers: {
    oninput: null,
    onclose: null
  },

  properties: {
    value: "",
    capsLock: false,
    translated: true,
  },

  init() {
    this.elements.main = document.createElement('div');
    this.elements.main.classList.add('keyboard');
    
    this.elements.keysContainer = document.createElement('div');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this.createKeys());

    this.elements.heading = document.createElement('h2');
    this.elements.heading.classList.add('heading');
    this.elements.heading.textContent = 'To Switch languages press Win + Space';

    this.elements.paragraph = document.createElement('p');
    this.elements.paragraph.classList.add('paragraph');
    this.elements.paragraph.textContent = 'This keyboard was created in Linux OS'
    
    this.elements.textarea = document.createElement('textarea');
    this.elements.textarea.classList.add('textarea');

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');


    this.elements.main.appendChild(this.elements.textarea);
    this.elements.main.appendChild(this.elements.keysContainer);
    this.elements.main.appendChild(this.elements.paragraph);
    this.elements.main.appendChild(this.elements.heading);
    document.body.appendChild(this.elements.main);


    this.elements.textarea.addEventListener('focus', () => {
      this.open(this.elements.textarea.value, currentValue => {
        this.elements.textarea.value = currentValue;
      })
    })

  },

  createKeys() {
    const fragment = document.createDocumentFragment();
    let arr = [];
    const keyLayout = [
      'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=','backspace',
      'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'x', 'ъ', '\\', 'del',
      'caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э','enter',
      'ShiftL', '\\', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '/', '↑', 'Shift',
      'ctrlL','win', 'alt', 'space', 'alt', '←', '↓', '→', 'ctrlR'
    ];

    const keyLayoutEng = [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=','backspace',
      'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'del',
      'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'','enter',
      'ShiftL', '\\', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'Shift',
      'ctrlL','win', 'alt', 'space', 'alt', '←', '↓', '→', 'ctrlR'
    ];


    if (this.properties.translated) {
      arr = keyLayout
    } else {
      arr = keyLayoutEng
    }

    arr.forEach(key => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['backspace', 'enter', 'Shift', 'del'].indexOf(key) !== -1;
      const divider = document.createElement('div');
      const rusRow = ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '-', '+', 'backspace'];
      const enRow = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '+', 'backspace'];

      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');

      switch (key) {
        case 'backspace':
          keyElement.classList.add('keyboard__key_wide');
          keyElement.textContent = 'backspace';
          keyElement.appendChild(divider)

          keyElement.addEventListener('click', () => {
            const temp = this.elements.textarea.value.split('')
            const position = this.elements.textarea.selectionStart;
            if (position === 0) return ;
            temp.splice(position-1, 1);
            this.elements.textarea.value = temp.join('');
            this.elements.textarea.selectionStart = this.elements.textarea.selectionEnd;
            this.elements.textarea.selectionStart = position-1;
          })
          break;

        case 'ShiftL':
          keyElement.classList.add('keyboard_key_shiftL');
          keyElement.textContent = 'shift';
          keyElement.appendChild(divider);

            keyElement.addEventListener('mousedown', () => {
                this.toggleTranslate()
                this.toggleCapslock();
            });

            keyElement.addEventListener('mouseup', () => {
              this.toggleCapslock();
            });
           
          break;


          case 'Shift': 
          keyElement.classList.add('keyboard_key_shiftR');
          keyElement.textContent = 'shift';
          keyElement.appendChild(divider)

          keyElement.addEventListener('mousedown', () => {
            this.toggleCapslock();
          });

          keyElement.addEventListener('mouseup', () => {
            this.toggleCapslock();
          });
          break;

          case 'del': 
          keyElement.classList.add('keyboard__key', 'keyboard__key_middle');
          keyElement.textContent = 'del';
          keyElement.appendChild(divider)

          keyElement.addEventListener('click', () => {
            const temp = this.elements.textarea.value.split('')
            const position = this.elements.textarea.selectionStart;
            temp.splice(position, 1);
            this.elements.textarea.value = temp.join('');
            this.elements.textarea.selectionStart = this.elements.textarea.selectionEnd;
            this.elements.textarea.selectionStart = position;
          })
          break;
        
        case 'alt': 
          keyElement.textContent = 'alt';
          keyElement.appendChild(divider)

          break;

        case 'ctrlL': 
          keyElement.textContent = 'ctrl';
          keyElement.appendChild(divider)

          break;

          case 'ctrlR': 
          keyElement.textContent = 'ctrl';
          keyElement.appendChild(divider)

          break;
          
          case 'win': 
          keyElement.textContent = 'win';
          keyElement.appendChild(divider)

          break;

        case 'caps':
          keyElement.classList.add('keyboard__key_wide', 'keyboard__key_activatable');
          keyElement.textContent = 'Caps Lock';
          keyElement.appendChild(divider)

          keyElement.addEventListener('click', () => {
            this.toggleCapslock();
            keyElement.classList.toggle('keyboard__key_active');
          });

          break;

        case 'enter':
          keyElement.classList.add('keyboard__key_additional');
          keyElement.textContent = 'Enter';
          keyElement.appendChild(divider)

          keyElement.addEventListener('click', () => {
            this.properties.value += '\n'
            this.triggerEvents('oninput');
          });
          break;

        case 'tab':
          keyElement.classList.add('keyboard__key_wide', 'keyboard__key_middle');
          keyElement.textContent = 'Tab';
          keyElement.appendChild(divider)
          
          keyElement.addEventListener('click', () => {
            this.properties.value += '  '
            this.triggerEvents('oninput');
          });
          break;


        case 'space':
          keyElement.classList.add('keyboard__key_extra-wide');
          keyElement.innerHTML = '' 

          keyElement.addEventListener('click', () => {
            this.properties.value += ' '
            this.triggerEvents('oninput');
          });
          break;

          

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener('click', () => {
            this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
            this.triggerEvents('oninput');
          });

          break;

      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'));
      }
    });

    return fragment;
  },

  triggerEvents(handlerName) {
    if (typeof this.eventHandlers[handlerName] === 'function') {
      this.eventHandlers[handlerName](this.properties.value)
    }
  },

  toggleCapslock() {
    this.properties.capsLock = !this.properties.capsLock;

    this.elements.keys.forEach( key => {
      const copyKey = key;
      if (copyKey.childElementCount === 0) {
        copyKey.textContent = this.properties.capsLock ? copyKey.textContent.toUpperCase() : copyKey.textContent.toLowerCase()
      }
    })
  },

  toggleTranslate() {
    this.properties.translated = !this.properties.translated;
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
  },
};

window.addEventListener('DOMContentLoaded', () => {
  Keyboard.init();
  console.log( 'Sorry, link to PR https://github.com/KupryianauIvan/virtual-keyboard/pull/2' )
})

