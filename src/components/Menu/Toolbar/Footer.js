import React, { Component } from 'react';
import AdSense from 'react-adsense';

class Footer extends Component {

    render() {
        return (
            <footer class="page-footer font-small blue">

                <div class="footer-copyright text-center py-1">© 2020 Copyright:
                    <span> Rolstoelhockey</span>
                </div>
                <div id="ads-wrapper" class="hidden-xs hidden-sm"> 
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6534700259705406"
                    crossorigin="anonymous"></script>
                <ins class="adsbygoogle"
                    style={{display: 'block'}}
                    data-ad-client="ca-pub-6534700259705406"
                    data-ad-slot="4972479679"
                    data-ad-format="auto"
                    data-full-width-responsive="true"></ins>
                <script>
                    (adsbygoogle = window.adsbygoogle || []).push({});
                </script>
                </div>
            </footer>
        );
    }
}

export default Footer;