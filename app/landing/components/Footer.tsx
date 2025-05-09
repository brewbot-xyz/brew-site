import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black/30 border-t border-brew-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            {/* <Logo /> */}
            <p className="mt-4 text-brew-text-secondary">
              A powerful Discord bot with moderation, voice channels, and minigames.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-brew-text-secondary hover:text-white transition">Home</a></li>
              <li><a href="#features" className="text-brew-text-secondary hover:text-white transition">Features</a></li>
              <li><a href="#commands" className="text-brew-text-secondary hover:text-white transition">Commands</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="https://discord.gg/brew" className="text-brew-text-secondary hover:text-white transition">Discord Server</a></li>
              <li><a href="#" className="text-brew-text-secondary hover:text-white transition">Documentation</a></li>
              <li><a href="#" className="text-brew-text-secondary hover:text-white transition">FAQs</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-brew-text-secondary hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="text-brew-text-secondary hover:text-white transition">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-brew-border mt-8 pt-8 text-center text-brew-text-muted">
          <p>© {new Date().getFullYear()} Brew Bot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;