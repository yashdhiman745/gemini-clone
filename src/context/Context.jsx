import React, { createContext, useState } from "react";
import runchat from "../config/gemini.js";
import run from "../config/gemini";

export const Context = createContext();
const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const newchat = () => {
    setLoading(false);
    setShowResult(false);
  };
  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    if (prompt !== undefined) {
      response = await runchat(prompt);
      setRecentPrompt(prompt);
    } else {
      setPrevPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await runchat(input);
    }
    // const result = await runchat(input);
    // logic to avoid ** and make it bold
    // now wherever the * present in the result it converts in substring.
    // let responsearray = result.split("**");
    // let newresponse;
    // for (let i = 0; i < responsearray.length; i++) {
    //   if (i === 0 || i % 2 != 1) {
    //     newresponse += responsearray[i];
    //   } else {
    //     newresponse += "<b>" + responsearray[i] + "</b>";
    //   }
    // }
    // setRecentPrompt(input);
    // setResultData(result);
    setResultData(response);
    // setResultData(newresponse);
    setLoading(false);
    setInput("");
  };

  const contextvalue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    recentPrompt,
    setRecentPrompt,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    input,
    setInput,
    newchat,
  };
  return (
    <Context.Provider value={contextvalue}>{props.children}</Context.Provider>
  );
};
// const Context = (props) => {
//
//   const contextvalue = {};
//   return (
//     <context.Provider value={contextvalue}>{props.children}</context.Provider>
//   );
// };

export default ContextProvider;
