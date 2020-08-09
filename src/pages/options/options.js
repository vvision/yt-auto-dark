const options = new Map()
  .set('prefersColorScheme', 'checkbox')
  .set('timeBased', 'checkbox')
  .set('beforeHour', 'number')
  .set('afterHour', 'number');
const storage = browser.storage.sync;
const defaultOptions = {
  prefersColorScheme: false,
  timeBased: false,
  beforeHour: 8,
  afterHour: 18,
};

const renderContents = function () {
  helpers.insertI18nContentIntoDocument(document);
};

const getElementValueById = id => {
  const element = document.getElementById(id);
  const type = options.get(id);
  if (type === 'checkbox') {
    return element.checked;
  } else {
    return element.value;
  }
};

const setElementValueById = (id, value) => {
  const element = document.getElementById(id);
  const type = options.get(id);
  if (type === 'checkbox') {
    element.checked = value;
  } else {
    element.value = value;
  }
};

const saveOptions = async e => {
  e.preventDefault();
  const id = e.target.id;
  const dataToStore = {};
  dataToStore[id] = getElementValueById(id);
  await storage.set(dataToStore);
};

const restoreOptions = () => {
  const setCurrentChoice = result => {
    if (result) {
      logStep(`Restoring options: ${JSON.stringify(result)}`);
      for (const option of options.keys()) {
        const value = result[option] || defaultOptions[option];
        if (value) {
          setElementValueById(option, value);
        }
      }
    }
  };

  const onError = error => {
    console.error(`Error: ${error}`);
  };

  storage.get(Array.from(options.keys())).then(setCurrentChoice, onError);
};

document.addEventListener('DOMContentLoaded', () => {
  for (const option of options.keys()) {
    // Add event listener on inputs
    document.getElementById(option).addEventListener('change', saveOptions);
  }

  // Insert i18n content
  renderContents();
  // Restore options from storage
  restoreOptions();
});
