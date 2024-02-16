import { createGlobalStyle } from "styled-components";
import designSystem from "./designSystem";

export default createGlobalStyle`
  html,
  body,
  p,
  ol,
  ul,
  li,
  dl,
  dt,
  dd,
  blockquote,
  figure,
  fieldset,
  legend,
  textarea,
  pre,
  iframe,
  hr,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 100%;
    font-weight: normal;
  }

  ul {
    list-style: none;
  }

  button {
    padding: 0;
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
  }

  button:disabled {
    cursor: not-allowed;
  }

  input {
    all: unset;
  }

  textarea {
    all: unset;
  }
  
  select {
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  html {
    box-sizing: border-box;
  }


  * {
    box-sizing: border-box;
    
    -moz-scrollbar-width: thin;
    -moz-scrollbar-color: ${designSystem.color.neutral.gray200} ${designSystem.color.neutral.white};

    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-track {
      background-color: transparent;
      border-radius: inherit;
    }

    &::-webkit-scrollbar-track:active {
      background-color: ${designSystem.color.neutral.gray50};
      border-radius: inherit;
    }

    &::-webkit-scrollbar-thumb {
      width: 4px;
      background-color: ${designSystem.color.neutral.gray200};
      border-radius: 4px;
      border: 2px solid ${designSystem.color.neutral.white}; 
    }

    &::-webkit-scrollbar-thumb:active {
      background-color: ${designSystem.color.neutral.gray400};
      border: 2px solid ${designSystem.color.neutral.gray50}; 
    }
  }
`;
