#pragma checksum "M:\Dulce\1.-2020\3.-Recargas\Para modificar\RecargaCelular Servidor\WebApplication1_vistas\WebApplication1\Views\Home\AddCompania.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "22eb9f4298d7fcf513dec66a076120c9d4fc8f7b"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Home_AddCompania), @"mvc.1.0.view", @"/Views/Home/AddCompania.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/Home/AddCompania.cshtml", typeof(AspNetCore.Views_Home_AddCompania))]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"22eb9f4298d7fcf513dec66a076120c9d4fc8f7b", @"/Views/Home/AddCompania.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"729efaa87342638aecfe1a972ce9f9f8dff55b4c", @"/Views/_ViewImports.cshtml")]
    public class Views_Home_AddCompania : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            BeginContext(0, 2, true);
            WriteLiteral("\r\n");
            EndContext();
#line 2 "M:\Dulce\1.-2020\3.-Recargas\Para modificar\RecargaCelular Servidor\WebApplication1_vistas\WebApplication1\Views\Home\AddCompania.cshtml"
  
    ViewData["Title"] = "AddCompania";

#line default
#line hidden
            BeginContext(49, 943, true);
            WriteLiteral(@"

<div class=""container"">
    <div class=""block-header"">
        <h2><strong>Registrar</strong> Compañia</h2>
    </div>

    <div class=""card"">
        <div class=""body"">
            <div class=""row clearfix"">
                <div class=""col-lg-6 col-md-12"">
                    <p class=""my-2"">Nombre de Compañia: *</p>
                    <div class=""form-group"">
                        <input id=""txtCompania"" type=""text"" class=""form-control"" placeholder=""Compañia"" minlength=""4"" required>
                    </div>
                </div>
                <div class=""col-lg-6 col-md-12"">
                    <p class=""my-2"">Status: *</p>
                    <div class=""form-group"">
                        <input id=""txtStatus"" type=""text"" class=""form-control"" placeholder=""breve descripcion"" minlength=""4"">
                    </div>
                </div>
                <div class=""col-lg-12 col-md-12 body"">
");
            EndContext();
            BeginContext(1486, 297, true);
            WriteLiteral(@"                    <div class=""custom-file"">
                        <input type=""file"" class=""custom-file-input"" id=""inputFileToLoad"" enctype=""multipart/form-data"">
                        <label class=""custom-file-label"" for=""customFile"">Seleccionar Logo</label>
                    </div>
");
            EndContext();
            BeginContext(1936, 819, true);
            WriteLiteral(@"
                    <input type=""text"" id=""response"" class=""form-control"" placeholder=""Base-64 value"" />
                    <input type=""text"" id=""binario"" class=""form-control"" placeholder=""Binario"" />
                    <img id=""preview"" src="""" class=""img-responsive align-center"" style=""display: none;"" width=""200"">
                </div>
                <div class=""col-lg-12 col-md-12 align-center"">
                    <br />
                    <button class=""btn btn-success btn-round"" id=""btnAgregar"">Agregar <i class=""zmdi zmdi-save""></i></button>
                    <button class=""btn btn-primary btn-round"" id=""BaseToImage"">Base64 <i class=""zmdi zmdi-save""></i></button>
                    <button class=""btn btn-primary btn-round"" id=""imgElem"">preview <i class=""zmdi zmdi-save""></i></button>
");
            EndContext();
            BeginContext(2975, 84, true);
            WriteLiteral("                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n");
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
