#pragma checksum "C:\Users\Nestor\Desktop\RecargasElectronicas\WebApplication1_vistas\WebApplication1\Views\Home\SubirLogo.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "f925d4c20868debed62af752127850ae964bb866"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Home_SubirLogo), @"mvc.1.0.view", @"/Views/Home/SubirLogo.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/Home/SubirLogo.cshtml", typeof(AspNetCore.Views_Home_SubirLogo))]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#line 1 "C:\Users\Nestor\Desktop\RecargasElectronicas\WebApplication1_vistas\WebApplication1\Views\_ViewImports.cshtml"
using WebApplication1;

#line default
#line hidden
#line 2 "C:\Users\Nestor\Desktop\RecargasElectronicas\WebApplication1_vistas\WebApplication1\Views\_ViewImports.cshtml"
using WebApplication1.Models;

#line default
#line hidden
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"f925d4c20868debed62af752127850ae964bb866", @"/Views/Home/SubirLogo.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"729efaa87342638aecfe1a972ce9f9f8dff55b4c", @"/Views/_ViewImports.cshtml")]
    public class Views_Home_SubirLogo : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/js/SubirLogos.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            BeginContext(0, 2, true);
            WriteLiteral("\r\n");
            EndContext();
#line 2 "C:\Users\Nestor\Desktop\RecargasElectronicas\WebApplication1_vistas\WebApplication1\Views\Home\SubirLogo.cshtml"
  
    ViewData["Title"] = "SubirLogo";

#line default
#line hidden
            BeginContext(47, 177, true);
            WriteLiteral("\r\n<script src=\"https://code.jquery.com/jquery-3.3.1.min.js\"\r\n        integrity=\"sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=\"\r\n        crossorigin=\"anonymous\"></script>\r\n");
            EndContext();
            BeginContext(272, 42, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "f925d4c20868debed62af752127850ae964bb8664163", async() => {
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(314, 606, true);
            WriteLiteral(@"

<div class=""container"">
    <div class=""block-header"">
        <h2><strong>Subir logo</strong></h2>
    </div>
    <div class=""card"">
        <div class=""body"">
            <b>Logo</b>
            <br><br>

            <div class=""form-inline"">
                &emsp;&emsp;&emsp;&emsp;&emsp;
                <input type=""text"" placeholder=""Cambiar leyenda"" class=""form-control"" id=""txtLeyenda"">
                &emsp;&emsp;&emsp;&emsp;&emsp;
                <button class=""btn btn-default btn-round""><input id=""SubirLogotipo"" type=""file"" class=""""> <i class=""zmdi zmdi-file""></i></button>
");
            EndContext();
            BeginContext(989, 839, true);
            WriteLiteral(@"                &emsp;&emsp;&emsp;&emsp;&emsp;
                <button class=""btn btn-default btn-round"" id=""btnVPrevia"">Vista Previa <i class=""zmdi zmdi-eye""></i> </button>
                &emsp;&emsp;&emsp;&emsp;&emsp;
                <button class=""btn btn-success btn-round"" id=""btnSubirLog"">Guardar <i class=""zmdi zmdi-plus""></i> </button>
            </div>
        </div>
    </div>
    <div id=""VPre"" class=""card"">
        <div class=""body"">
            <b>Vista Previa</b>
            <br><br>
            <div @*style=""position: relative; left: 0; top: 0;""*@ class=""col-lg-12 col-md-6 align-center"">
                <h6 class=""navbar-brand"" asp-controller=""Home"" asp-action=""Main"" id=""Index""><img src="""" id=""imgB64logo"" width=""35"" alt=""Logo""><span id=""txtLeyendaP"" class=""m-l-10"">RECARGACELULARES.COM.MX</span></h6>
");
            EndContext();
            BeginContext(1912, 356, true);
            WriteLiteral(@"            </div>
        </div>
    </div>

</div>
<style>
    .eye {
        position: absolute;
        height: 200px;
        width: 200px;
        top: 40px;
        left: 40px;
        z-index: 1;
    }

    .heaven {
        position: absolute;
        height: 300px;
        width: 300px;
        z-index: -1;
    }
</style>
");
            EndContext();
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591