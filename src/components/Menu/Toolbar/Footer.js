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
                    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                    <ins class="adsbygoogle hidden-xs hidden-sm"
                    data-ad-client="ca-pub-6534700259705406"
                    data-ad-slot="4972479679">
                    </ins>
                    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
                </div>
            </footer>
        );
    }
}

export default Footer;