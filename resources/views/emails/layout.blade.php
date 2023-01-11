<!DOCTYPE html>
<html>
    <head>
        <title>MyApp</title>

        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

        <style>
            /* Reset */
            body, h1, h2, h3, h4, h5, h6, p, ol, ul {
                margin: 0;
                padding: 0;
                font-weight: normal;
            }

            ol, ul {
                list-style: none;
            }

            img {
                max-width: 100%;
                height: auto;
            }

            /* End Reset */

            body {
                background-color: #ffffff;
                font-family: Helvetica, Arial, "sans-serif";
                color: #000;
                font-size: 16px;
                line-height: 20px;
                -moz-text-size-adjust: none;
                -webkit-text-size-adjust: none;
                -ms-text-size-adjust: none;
            }

            a {
                color: #000;
                text-decoration: underline;
            }
        </style>
    </head>

    <body>
        <table width="800" border="0" cellspacing="0" cellpadding="0">
        <tbody>

            {{-- Header --}}
            {{-- TODO: Make a header --}}
            {{-- <tr>
                <td align="middle" valign="bottom" width="680">
                    <img src="{{ asset('images/emails/header-generic.jpg') }}" alt="Star Insure" width="680" height="443"/>
                </td>
            </tr> --}}

            {{-- Body --}}
            <tr>
                <td width="680" align="middle">
                    <table border="0" cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <td width="680" align="middle" valign="top" style="padding-bottom: 0px; font-family: Helvetica, Arial, 'sans-serif'; color: #67645f; padding: 24px 0px; text-align: left;">
                                    @yield('body')
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>

            {{-- Footer --}}
            <tr>
                <td width="680" align="middle" valign="bottom">
                    <table border="0" cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <td width="680" align="middle" valign="top">
                                    <div style="background: #000; color: #fff; border-radius: 8px 8px 0px 0px; padding: 24px; text-align: right;">
                                        <img src="{{ asset('images/emails/logo-white.png') }}" alt="MyApp" height="34" width="122"/>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
        </table>
    </body>
</html>
