#pragma checksum "C:\Users\Nestor\Desktop\RecargasElectronicas\WebApplication1_vistas\WebApplication1\Views\Home\Main.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "f98a2b88b6abe6a710f2c07484f44cbe7bce44cc"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Home_Main), @"mvc.1.0.view", @"/Views/Home/Main.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/Home/Main.cshtml", typeof(AspNetCore.Views_Home_Main))]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"f98a2b88b6abe6a710f2c07484f44cbe7bce44cc", @"/Views/Home/Main.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"729efaa87342638aecfe1a972ce9f9f8dff55b4c", @"/Views/_ViewImports.cshtml")]
    public class Views_Home_Main : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("class", new global::Microsoft.AspNetCore.Html.HtmlString("d-block w-100"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/assets/images/slides/image-1.jpg"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("alt", new global::Microsoft.AspNetCore.Html.HtmlString("First Slide"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("alt", new global::Microsoft.AspNetCore.Html.HtmlString("Second Slide"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
#line 2 "C:\Users\Nestor\Desktop\RecargasElectronicas\WebApplication1_vistas\WebApplication1\Views\Home\Main.cshtml"
  
    Layout = "~/Views/Shared/_LayoutLogout.cshtml";
    ViewData["Title"] = "Bienvenido";

#line default
#line hidden
            BeginContext(101, 361, true);
            WriteLiteral(@"
<div id=""carrousel"" class=""carousel slide"" data-ride=""carousel"">
    <ol class=""carousel-indicators"">
        <li data-target=""#carrousel"" data-slide-to=""0"" class=""active""></li>
        <li data-target=""#carrousel"" data-slide-to=""1""></li>
    </ol>
    <div class=""carousel-inner"" role=""listbox"">
        <div class=""carousel-item active"">
            ");
            EndContext();
            BeginContext(462, 86, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("img", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagOnly, "f98a2b88b6abe6a710f2c07484f44cbe7bce44cc5441", async() => {
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(548, 245, true);
            WriteLiteral("\r\n            <div class=\"carousel-caption\">\r\n                <h3>Notificar tus compras ya es pasado</h3>\r\n                <p>Genera tus referencias aqui</p>\r\n            </div>\r\n        </div>\r\n        <div class=\"carousel-item \">\r\n            ");
            EndContext();
            BeginContext(793, 87, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("img", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagOnly, "f98a2b88b6abe6a710f2c07484f44cbe7bce44cc7037", async() => {
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_3);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(880, 4429, true);
            WriteLiteral(@"
            <div class=""carousel-caption"">
                <h3>Ofrecelos a tus clientes y sigue incrementando GANANCIAS</h3>
                <p>segunda foto</p>
            </div>
        </div>
        <a class=""carousel-control-prev"" href=""#carrousel"" role=""button"" data-slide=""prev"">
            <span class=""carousel-control-prev-icon""></span>
            <span class=""sr-only"">Previus</span>
        </a>
        <a class=""carousel-control-next"" href=""#carrousel"" role=""button"" data-slide=""next"">
            <span class=""carousel-control-next-icon""></span>
            <span class=""sr-only"">Next</span>
        </a>
    </div>
</div>
<!-- Termina el carrousel-->
<br />
<!-- Inicia los cuadros de noticias-->
<div class=""row clearfix"">
    <div class=""col-lg-4 col-md-12"">
        <div class=""card"">
            <div class=""carousel slide twitter feed"" data-ride=""carousel"">
                <div class=""carousel-inner"" role=""listbox"">
                    <div class=""carousel-item active align");
            WriteLiteral(@"-center"">
                        <i class=""zmdi zmdi-reader zmdi-hc-4x""></i>
                        <a href=""#"">
                            <h4 style=""color:#fff"" ;>Consulta <span>Nuestros </span><br>Comunicados</h4>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class=""col-lg-4 col-md-12"">
        <div class=""card"">
            <div class=""carousel slide google feed"" data-ride=""carousel"">
                <div class=""carousel-inner"" role=""listbox"">
                    <div class=""carousel-item active align-center"">
                        <i class=""zmdi zmdi-comment-list zmdi-hc-4x""></i>
                        <a href=""#"">
                            <h4 style=""color:#fff"" ;>Preguntas <span><br />FRECUENTES</span></h4>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class=""col-lg-4 col-md-12"">
        <div class=");
            WriteLiteral(@"""card"">
            <div class=""carousel slide facebook feed"" data-ride=""carousel"">
                <div class=""carousel-inner"" role=""listbox"">
                    <div class=""carousel-item active align-center"">
                        <i class=""zmdi zmdi-library zmdi-hc-4x""></i>
                        <a href=""#"">
                            <h4 style=""color:#fff"" ;>Guia<span> de</span><br>REFERENCIA</h4>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class=""col-lg-4 col-md-12"">
        <div class=""card"">
            <div class=""carousel slide facebook feed"" data-ride=""carousel"">
                <div class=""carousel-inner"" role=""listbox"">
                    <div class=""carousel-item active align-center"">
                        <i class=""zmdi zmdi-collection-bookmark zmdi-hc-4x""></i>
                        <a href=""#"">
                            <h4 style=""color:#fff"" ;>MANUALES</h4>
               ");
            WriteLiteral(@"         </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class=""col-lg-4 col-md-12"">
        <div class=""card"">
            <div class=""carousel slide twitter feed"" data-ride=""carousel"">
                <div class=""carousel-inner"" role=""listbox"">
                    <div class=""carousel-item active align-center"">
                        <i class=""zmdi zmdi-tv zmdi-hc-4x""></i>
                        <a href=""#"">
                            <h4 style=""color:#fff"" ;><span>TUTORIALES </span><br></h4>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class=""col-lg-4 col-md-12"">
        <div class=""card"">
            <div class=""carousel slide google feed"" data-ride=""carousel"">
                <div class=""carousel-inner"" role=""listbox"">
                    <div class=""carousel-item active align-center"">
                        <i class=""zmdi zm");
            WriteLiteral(@"di-local-offer zmdi-hc-4x""></i>
                        <a href=""#"">
                            <h4 style=""color:#fff"" ;><span>PROMOCION</span></h4>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Finaliza los cuadros de noticias-->
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
