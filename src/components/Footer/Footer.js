import React from 'react';
import './Footer.css'

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const Footer = () => (
  <footer>
    <div class="nes-container with-title is-centered">
      <section class="icon-list">
        <i class="nes-ash"></i>
        <i class="nes-pokeball"></i>
        <i class="nes-bulbasaur"></i>
        <i class="nes-charmander"></i>
        <i class="nes-squirtle"></i>
        <i class="nes-kirby"></i>
        <i class="nes-octocat animate"></i>
      </section>
      &copy; Really cool website
    </div>
  </footer>
);

export default Footer;
