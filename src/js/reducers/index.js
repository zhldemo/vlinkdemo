import {
  ADD_CAT,
  ADD_LINK,
  RESET,
  CAT_FILTER
} from '../constants/action-types';
const defaultState = {
  cat: {
    cats: ['demo'],
    currentcat: ''
  },
  links: [],
  demoData: [
    {
      cat: 'demo',
      id: 'demo001',
      ogTitle: "Zhonghui Liu's Potofolio",
      ogDescription: 'Coding ,The door to another world . . .',
      imgUrl: { url: 'http://zhlio.com/documents/footlogo.png' },
      requestUrl: 'http://www.zhldev.com'
    },
    {
      cat: 'demo',
      id: 'demo002',
      ogTitle: "Build software better, together",
      ogDescription: 'GitHub is where people build software. More than 27 million people use GitHub to discover, fork, and contribute to over 80 million projects.',
      imgUrl: { url: 'https://assets-cdn.github.com/images/modules/open_graph/github-logo.png' },
      requestUrl: 'http://github.com'
    },
    {
      cat: 'demo',
      id: 'demo003',
      ogTitle: 'Facebook - Log In or Sign Up',
      ogDescription:
        'Create an account or log into Face…s, send messages and get updates.',
      imgUrl: { url: 'https://www.facebook.com/images/fb_icon_325x325.png' },
      requestUrl: 'http://www.facebook.com'
    }
  ]
};

// Function for saving the state to localStorage
const localSave = obj => {
  if (localStorage.length > 0) {
    localStorage.clear();
  }
  localStorage.setItem('state', JSON.stringify(obj)); //must be JSON string
};

//  Checking the localStorage and setup the initial state
let initialState;
if (localStorage.length > 0) {
  initialState = {
    ...JSON.parse(localStorage.state),
    filteron: false,
    filtercat: ''
  };

  // If localStorage will be the initial state, then set filter off
} else {
  initialState = defaultState;
}

// Saving state to localStorage after creating links or categories
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET:
      return defaultState;
    case ADD_LINK:
      state = {
        ...state,
        links: [...state.links, action.payload]
      };
      localSave(state);
      return state;
    case ADD_CAT:
      state = {
        ...state,
        cat: { ...state.cat, cats: [...state.cat.cats, action.payload] }
      };
      localSave(state);
      return state;

    case CAT_FILTER:
      state = {
        ...state,
        filteron: true,
        filtercat: action.payload
      };
      return state;

    default:
      return state;
  }
};

export default rootReducer;
