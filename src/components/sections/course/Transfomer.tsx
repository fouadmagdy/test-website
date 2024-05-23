import React from 'react'

interface TransformerProps {
    text: string | null;
    isHyper ?: boolean;
}

const transformString = (inputString: string | null, isHyper: boolean): (string | JSX.Element)[] | null => {
    if (!inputString) {
      return null;
    }
  
    const regex = /\$([A-Z0-9 ]+)\|(\d+)\$/g;
    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;
  
    inputString.replace(regex, (match: string, code: string, id: string, offset: number) => {
      if (offset > lastIndex) {
        parts.push(inputString.substring(lastIndex, offset));
      }
      parts.push(
        isHyper ? 
        <a href={`?coID=${id}`} key={offset + match}> {code} </a> :
        <span> {code} </span>
      );
      lastIndex = offset + match.length;
      return match;
    });
    
    if (lastIndex < inputString.length) {
      parts.push(inputString.substring(lastIndex));
    }
    return parts;
  };
  
  const StringTransformer: React.FC<TransformerProps> = ({ text, isHyper = true }) => {
    return <div>{transformString(text, isHyper)}</div>;
  };

  export default StringTransformer;