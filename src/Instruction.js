import React from 'react';
import './App.css';

const Instruction = props => {
  return (
    <div className="inswraper">
      <h3>Author</h3>
      <h4>
        Zhonghui Liu{' '}(Jason){' '}from{' '} <a href="http://www.zhldev.com">www.zhldev.com</a>
      </h4>
      <h3>What are Vlink doing for you?</h3>
      <h4>
        Vlink is a mini app which can covert website url to a Snapshot and save
        in your computer or online database. It is kind of note book which is
        used for store links as its content but it will convert them to more
        intuitive format and classify them for storage. This app will help the
        person who need frequently review lots of documents online and need an
        intuitive direct way to find them. Additionally, The Demo Version will
        have much limitation on features.{' '}
      </h4>
      <h3>Operation instruction</h3>
      <h4>
        <p>Top Menu: -Choose existing categories and add links to them. (left-top conner "select" and middle Addlink "button" ) -Create Categories: Right-top conner "button"</p>
        <p>Left Sidebar: -Reset the content to initial content and wipe the localStorage. -Homepage, demo, etc buttons will help you filter the link list.-The links under Categories of the Sidebar
        will Show the links by their categories. </p>
      <p>Link list at the center: -each link will be a snapshot of the url with a logo, title and website description.</p>

      </h4>
    </div>
  );
};

export default Instruction;
