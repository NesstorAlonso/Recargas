#pragma checksum "M:\Dulce\1.-2020\3.-Recargas\Para modificar\RecargaCelular Servidor\WebApplication1_vistas\WebApplication1\Views\Home\Usuarios2.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "810abd8a80900b95fb34919bfd41c4fe1775cbab"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Home_Usuarios2), @"mvc.1.0.view", @"/Views/Home/Usuarios2.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/Home/Usuarios2.cshtml", typeof(AspNetCore.Views_Home_Usuarios2))]
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
#line 1 "M:\Dulce\1.-2020\3.-Recargas\Para modificar\RecargaCelular Servidor\WebApplication1_vistas\WebApplication1\Views\_ViewImports.cshtml"
using WebApplication1;

#line default
#line hidden
#line 2 "M:\Dulce\1.-2020\3.-Recargas\Para modificar\RecargaCelular Servidor\WebApplication1_vistas\WebApplication1\Views\_ViewImports.cshtml"
using WebApplication1.Models;

#line default
#line hidden
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"810abd8a80900b95fb34919bfd41c4fe1775cbab", @"/Views/Home/Usuarios2.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"729efaa87342638aecfe1a972ce9f9f8dff55b4c", @"/Views/_ViewImports.cshtml")]
    public class Views_Home_Usuarios2 : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("asp-area", "", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("asp-controller", "Home", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("asp-action", "regUsuario", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("title", new global::Microsoft.AspNetCore.Html.HtmlString("Cuenta"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            BeginContext(0, 2, true);
            WriteLiteral("\r\n");
            EndContext();
#line 2 "M:\Dulce\1.-2020\3.-Recargas\Para modificar\RecargaCelular Servidor\WebApplication1_vistas\WebApplication1\Views\Home\Usuarios2.cshtml"
  
    ViewData["Title"] = "Usuarios";

#line default
#line hidden
            BeginContext(46, 383, true);
            WriteLiteral(@"
<div class=""container"">
    <div class=""block-header"">
        <h2><strong>Usuarios</strong></h2>
    </div>
    <div class=""card"">
        <div class=""body"">
            <div class=""row clearfix"">
                <div class=""table-responsive col-lg-12"">

                    <div class=""row"">
                        <div class=""col-lg-12"">
                            ");
            EndContext();
            BeginContext(429, 298, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("a", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "810abd8a80900b95fb34919bfd41c4fe1775cbab5329", async() => {
                BeginContext(505, 218, true);
                WriteLiteral("\r\n                                <button class=\"btn btn-default pull-right add-row\"><i class=\"fa fa-plus\"></i>&nbsp;&nbsp; Agregar usuario <i class=\"zmdi zmdi-plus-circle-o\"></i></button>\r\n                            ");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Area = (string)__tagHelperAttribute_0.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Controller = (string)__tagHelperAttribute_1.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_1);
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Action = (string)__tagHelperAttribute_2.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_2);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_3);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(727, 349, true);
            WriteLiteral(@"
                        </div>
                    </div>

                    <table class=""table table-bordered align-center"" id=""tbUsuario"">
                        <thead class=""thead-dark"" align=""center"">
                            <tr>
                                <th>Editar</th>
                                <th>Nombre</th>
");
            EndContext();
            BeginContext(1129, 214, true);
            WriteLiteral("                                <th>Correo</th>\r\n                                <th>Punto de venta</th>\r\n\r\n\r\n                            </tr>\r\n                        </thead>\r\n                        <tbody>\r\n\r\n");
            EndContext();
            BeginContext(2086, 3449, true);
            WriteLiteral(@"
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class=""container"">
            <div class=""block-header"">
                <h2><strong>Distribuidores</strong></h2>
            </div>
            <div class=""card"">
                <div class=""dd"">
                    <ol class=""dd-list"">

                        <li class=""dd-item dd3-item"" data-id=""15"">
                            <div class=""dd3-content"">Distribuidores</div>
                            <ol class=""dd-list"">
                                <li class=""dd-item"" data-id=""1"">
                                    <div class=""dd3-content"" id=""tbDistribuidores""></div>
                                </li>

                                <li class=""dd-item dd3-item"" data-id=""15"">
                                    <div class=""dd3-content"">Sub-distribuidores</div>
                                    <ol class=""dd-list"">
                       ");
            WriteLiteral(@"                 <li class=""dd-item"" data-id=""3"">
                                            <div class=""dd3-content"" id=""tbDistribuidores1""></div>
                                        </li>
                                        <li class=""dd-item dd3-item"" data-id=""15"">
                                            <div class=""dd3-content"">Sub-distribuidores 2</div>
                                            <ol class=""dd-list"">
                                                <li class=""dd-item"" data-id=""3"">
                                                    <div class=""dd3-content"" id=""tbDistribuidores2""></div>
                                                </li>
                                                <li class=""dd-item dd3-item"" data-id=""15"">
                                                    <div class=""dd3-content"">Sub-distribuidores 3</div>
                                                    <ol class=""dd-list"">
                                                        <li cla");
            WriteLiteral(@"ss=""dd-item"" data-id=""3"">
                                                            <div class=""dd3-content"" id=""tbDistribuidores3""></div>
                                                        </li>
                                                        <li class=""dd-item dd3-item"" data-id=""15"">
                                                            <div class=""dd3-content"">Sub-distribuidores 4</div>
                                                            <ol class=""dd-list"">
                                                                <li class=""dd-item"" data-id=""3"">
                                                                    <div class=""dd3-content"" id=""tbDistribuidores4""></div>
                                                                </li>
                                                            </ol>
                                                        </li>
                                                    </ol>
                                         ");
            WriteLiteral(@"       </li>
                                            </ol>
                                        </li>
                                    </ol>
                                </li>
                            </ol>
                        </li>
                    </ol>
                </div>
            </div>
        </div>

        </div>
</div>


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
