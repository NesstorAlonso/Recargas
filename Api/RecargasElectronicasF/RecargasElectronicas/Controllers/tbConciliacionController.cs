using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using OfficeOpenXml.Drawing;
using OfficeOpenXml.Style;
using OfficeOpenXml.Table;
using RecargasElectronicas.Models.DBF;

namespace RecargasElectronicas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class tbConciliacionController : ControllerBase
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly bdRecargas2Context _db;

        public tbConciliacionController(IHostingEnvironment hostingEnvironment, bdRecargas2Context db)
        {
            _hostingEnvironment = hostingEnvironment;
            _db = db;
        }
        //api/tbConciliacion/Export2
        [HttpGet("Export2")]
        public async Task<IActionResult> Export2(CancellationToken cancellationToken)
        //public string ExportCustomer()
        {
            await Task.Yield();

            List<TbConciliacion> listaConciliaciones2 = _db.TbConciliacion.ToList(); //Nombre de la clase de donde se estan obteniendo los datos + el context de la BD

            var stream = new MemoryStream(); //sirve mas tarde para leer archivos

            DataTable Dt = new DataTable(); // crea una nueva datatable conteniendo lo siguiente
            Dt.Columns.Add("ID Conciliacion", typeof(Int32));  //agrega la siguiente columna
            Dt.Columns.Add("Concepto", typeof(string));
            Dt.Columns.Add("Monto", typeof(string));
            Dt.Columns.Add("Referencia", typeof(string));
            Dt.Columns.Add("Fecha", typeof(DateTime));
            Dt.Columns.Add("Numero de autorizacion", typeof(string));

            foreach (var data in listaConciliaciones2) // para obtener la informacion
            {
                DataRow row = Dt.NewRow(); //en base al datatable se obtiene la siguiente informacion
                row[0] = data.IntIdConciliacion; // en la fila n del excel se ingresa el dato de la columna x de la base de datos
                row[1] = data.StrCarrier;
                row[2] = data.StrMonto;
                row[3] = data.StrOpAccount;
                row[4] = data.StrFecha;
                row[5] = data.StrOpAuthorization;
                Dt.Rows.Add(row);

            }

            using (var package = new ExcelPackage(stream))//crea un nuevo archivo de excel
            {

                var workSheet = package.Workbook.Worksheets.Add("Conciliaciones");//Un nuevo worksheet de nombre workSheet que manipulara el documento
                workSheet.Cells["B16"].LoadFromDataTable(Dt, true, TableStyles.None);// carga los datos desde el datable sobre la celda A4 en este caso
                workSheet.Cells["B16:BN16"].Style.Font.Bold = true; // desde la celda A1 a AN1 se le pone estilo negritas

                //OCULTA LAS LINEAS DE REJILLA DEL DOCUMENTO
                workSheet.View.ShowGridLines = false;


                //FORMATO DE ALINEACION
                workSheet.Cells["A5:A14"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;
                workSheet.Cells["B5:B14"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left; //a la segunda columna se le pone orientacion horizontal
                workSheet.Cells["C5:C14"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;
                workSheet.Cells["D5:D14"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;

                //FORMATO DE ALINEACION
                workSheet.Cells["B16:B10000"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                workSheet.Cells["C16:C10000"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center; //a la segunda columna se le pone orientacion horizontal
                workSheet.Cells["D16:D10000"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                workSheet.Cells["E16:E10000"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                workSheet.Cells["F16:F10000"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                workSheet.Cells["G16:G10000"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                //FORMATO PARA LA FECHA
                workSheet.DefaultColWidth = 20;
                workSheet.Column(6).Style.Numberformat.Format = "yyyy-mm-dd h:mm:ss"; // la columna 5 tiene formato de año, mes,dia y hora y minuto
                workSheet.Column(6).Width = 20;

                workSheet.Column(1).Width = 5;

                //AUTO AJUSTAR COLUMNAS
                workSheet.Column(1).AutoFit();
                workSheet.Column(2).AutoFit();
                workSheet.Column(3).AutoFit();
                workSheet.Column(4).AutoFit();
                workSheet.Column(5).AutoFit();
                workSheet.Column(6).AutoFit();
                workSheet.Column(7).AutoFit();
                workSheet.Column(8).AutoFit();
                workSheet.Column(9).AutoFit();
                workSheet.Column(10).AutoFit();
                //Combina las celdas A2 hasta F2
                workSheet.Cells["B1:J2"].Merge = true;

                //Establece la altura a 50 de la fila 2
                double rowHeight = 100;
                workSheet.Row(2).Height = rowHeight;

                //establece el color en formato Hex
                Color colFromHex = System.Drawing.ColorTranslator.FromHtml("#9dc3e6");
                workSheet.Cells["B1:J2"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                workSheet.Cells["B1:J2"].Style.Fill.BackgroundColor.SetColor(colFromHex);




                //CAMBIAR LA IMAGEN
                string path = @"C:\inetpub\wwwroot\ApiRecargas\wwwroot\pagaquilogo.png";
                Image logo = Image.FromFile(path);

                for (int a = 0; a < 1; a++)
                {
                    var picture = workSheet.Drawings.AddPicture(a.ToString(), logo);
                    picture.SetPosition(a * 5, 20, 2, 0);
                }
                //

                //APARTADO DE DATOS
                var vals = new string[] { "Nombre", "Direccion", "ID Cliente", "Telefono", "Periodo" };
                var rng = workSheet.Cells["B5:B9"];
                rng.LoadFromCollection(vals);
                workSheet.Cells["B5:B9"].Style.Font.Size = 10;
                workSheet.Cells["B5:B9"].Style.Font.Name = "Verdana";

                var vals2 = new string[] { "RECARGAS INTERNACIONALES", "CALLE 4, 20, NA, EL CERRITO, YANGA, VERACRUZ,  94930", "0000000031", "2717140102", "2019/08/01" };
                var rng2 = workSheet.Cells["C5:C9"];
                rng2.LoadFromCollection(vals2);

                var periodo = new string[] { "A" };
                var texto = workSheet.Cells["D9"];
                texto.LoadFromCollection(periodo);
                var periodo2 = new string[] { "2019/08/31" };
                var texto2 = workSheet.Cells["E9"];
                texto2.LoadFromCollection(periodo2);

                workSheet.Cells["B4:F4"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                workSheet.Cells["B4:F4"].Style.Fill.BackgroundColor.SetColor(colFromHex);

                //Combina las celdas A2 hasta F2
                workSheet.Cells["B4:F4"].Merge = true;

                var vals3 = new string[] { "Datos cliente" };
                var rng3 = workSheet.Cells["B4"];
                rng3.LoadFromCollection(vals3);
                workSheet.Cells["B4"].Style.Font.Size = 14;
                workSheet.Cells["B4"].Style.Font.Name = "Verdana";
                workSheet.Cells["B4"].Style.Font.Bold = true; // desde la celda A1 a AN1 se le pone estilo negritas

                workSheet.Cells["B10:F10"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                workSheet.Cells["B10:F10"].Style.Fill.BackgroundColor.SetColor(colFromHex);

                //Combina las celdas A2 hasta F2
                workSheet.Cells["B10:F10"].Merge = true;

                var vals4 = new string[] { "Datos de proveedor" };
                var rng4 = workSheet.Cells["B10"];
                rng4.LoadFromCollection(vals4);
                workSheet.Cells["B10"].Style.Font.Size = 14;
                workSheet.Cells["B10"].Style.Font.Name = "Verdana";
                workSheet.Cells["B10"].Style.Font.Bold = true; // desde la celda A1 a AN1 se le pone estilo negritas

                var vals5 = new string[] { "Nombre", "Telefono" };
                var rng5 = workSheet.Cells["B11:B12"];
                rng5.LoadFromCollection(vals5);
                workSheet.Cells["B11:B12"].Style.Font.Size = 10;
                workSheet.Cells["B11:B12"].Style.Font.Name = "Verdana";
                var vals6 = new string[] { "PAGAQUI ", "5555555555" };
                var rng6 = workSheet.Cells["C11:C12"];
                rng6.LoadFromCollection(vals6);


                //Combina las celdas A2 hasta F2
                workSheet.Cells["B13:F13"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                workSheet.Cells["B13:F13"].Style.Fill.BackgroundColor.SetColor(colFromHex);
                workSheet.Cells["B13:F13"].Merge = true;


                var vals7 = new string[] { "Datos de Contacto" };
                var rng7 = workSheet.Cells["B13"];
                rng7.LoadFromCollection(vals7);
                workSheet.Cells["B13"].Style.Font.Size = 14;
                workSheet.Cells["B13"].Style.Font.Name = "Verdana";
                workSheet.Cells["B13"].Style.Font.Bold = true; // desde la celda A1 a AN1 se le pone estilo negritas

                var vals8 = new string[] { "JOSE TREJO" };
                var rng8 = workSheet.Cells["B14"];
                rng8.LoadFromCollection(vals8);

                //APARTADO DE BALANCE
                var balance1 = new string[] { "Compras", "Comision directa", "Comision indirecta", "Traspasos", "Ventas", "Otros cargos", "Total" };
                var balance11 = workSheet.Cells["G5:G11"];
                balance11.LoadFromCollection(balance1);
                workSheet.Cells["G5:G11"].Style.Font.Size = 11;
                workSheet.Cells["G5:G11"].Style.Font.Name = "Calibri";
                workSheet.Cells["G11"].Style.Font.Bold = true;

                workSheet.Cells["G4:H4"].Merge = true;

                workSheet.Cells["G5:H5"].Merge = true;
                workSheet.Cells["G6:H6"].Merge = true;
                workSheet.Cells["G7:H7"].Merge = true;
                workSheet.Cells["G8:H8"].Merge = true;
                workSheet.Cells["G9:H9"].Merge = true;
                workSheet.Cells["G10:H10"].Merge = true;
                workSheet.Cells["G11:H11"].Merge = true;

                workSheet.Cells["G4:H4"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                workSheet.Cells["G4:H4"].Style.Fill.BackgroundColor.SetColor(colFromHex);
                workSheet.Cells["J4"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                workSheet.Cells["J4"].Style.Fill.BackgroundColor.SetColor(colFromHex);
                workSheet.Cells["I4"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                workSheet.Cells["I4"].Style.Fill.BackgroundColor.SetColor(colFromHex);

                workSheet.Cells["I5:I11"].Style.Numberformat.Format = "$###,###,##0.00"; // FORMATO A MONEDA
                workSheet.Cells["I5"].Value = Convert.ToDecimal(222889);//CONVERTIR A DECIMAL
                workSheet.Cells["I6"].Value = Convert.ToDecimal(40.3148148148148);
                workSheet.Cells["I7"].Value = Convert.ToDecimal(2643.6389);
                workSheet.Cells["I11"].Formula = "=SUM(I5:I7)"; // FORMULA

                workSheet.Cells["J5:J11"].Style.Numberformat.Format = "$###,###,##0.00";
                workSheet.Cells["J8"].Value = Convert.ToDecimal(224589);
                workSheet.Cells["J9"].Value = Convert.ToDecimal(680);
                workSheet.Cells["J10"].Value = Convert.ToDecimal(8);
                workSheet.Cells["J11"].Formula = "=SUM(J8:J10)";

                var titulo1 = new string[] { "Balance del periodo" };
                var titulo11 = workSheet.Cells["G4"];
                titulo11.LoadFromCollection(titulo1);
                workSheet.Cells["G4"].Style.Font.Size = 12;
                workSheet.Cells["G4"].Style.Font.Name = "Calibri";
                workSheet.Cells["G4"].Style.Font.Bold = true;

                var titulo2 = new string[] { "Abonos" };
                var titulo22 = workSheet.Cells["I4"];
                titulo22.LoadFromCollection(titulo2);
                workSheet.Cells["I4"].Style.Font.Size = 12;
                workSheet.Cells["I4"].Style.Font.Name = "Calibri";
                workSheet.Cells["I4"].Style.Font.Bold = true;

                var titulo3 = new string[] { "Cargos" };
                var titulo33 = workSheet.Cells["J4"];
                titulo33.LoadFromCollection(titulo3);
                workSheet.Cells["J4"].Style.Font.Size = 12;
                workSheet.Cells["J4"].Style.Font.Name = "Calibri";
                workSheet.Cells["J4"].Style.Font.Bold = true;

                workSheet.Cells["G4"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;
                workSheet.Cells["I4"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                workSheet.Cells["J4"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                //APARTADO DE BALANCE
                var balance2 = new string[] { "Saldo inicial", "Movimientos generados", "Saldo actual" };
                var balance22 = workSheet.Cells["I12:I14"];
                balance22.LoadFromCollection(balance2);
                workSheet.Cells["I12:I14"].Style.Font.Size = 11;
                workSheet.Cells["I12:I14"].Style.Font.Name = "Calibri";
                workSheet.Cells["I13"].Style.Font.Italic = true;
                workSheet.Cells["I13"].Style.Font.Size = 10;

                Color colBal = System.Drawing.ColorTranslator.FromHtml("#c2ffa3");
                workSheet.Cells["I12:J12"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                workSheet.Cells["I12:J12"].Style.Fill.BackgroundColor.SetColor(colBal);
                workSheet.Cells["I14:J14"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                workSheet.Cells["I14:J14"].Style.Fill.BackgroundColor.SetColor(colBal);

                Color colorFont = System.Drawing.ColorTranslator.FromHtml("#006100");

                workSheet.Cells["I12"].Style.Font.Color.SetColor(colorFont);
                workSheet.Cells["I14"].Style.Font.Color.SetColor(colorFont);

                workSheet.Cells["J12:J14"].Style.Numberformat.Format = "$###,###,##0.00"; // FORMATO A MONEDA
                workSheet.Cells["J12"].Value = Convert.ToDecimal(235.756285185177);//CONVERTIR A DECIMAL
                workSheet.Cells["J13"].Formula = "=I11-J11";
                workSheet.Cells["J14"].Formula = "=SUM(J12:J13)";
                workSheet.Cells["J13"].Style.Font.Bold = true;

                workSheet.Cells["J11"].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                workSheet.Cells["I11"].Style.Border.Top.Style = ExcelBorderStyle.Thin;



                //LLENADO CON LA BASE DE DATOS
                //make the borders of cells A4 - f4 double
                workSheet.Cells["B16:G16"].Style.Border.Top.Style = ExcelBorderStyle.Thick;
                workSheet.Cells["B16:G16"].Style.Border.Bottom.Style = ExcelBorderStyle.Thick;
                workSheet.Cells["B16:G16"].Style.Border.Left.Style = ExcelBorderStyle.Thick;
                workSheet.Cells["B16:G16"].Style.Border.Right.Style = ExcelBorderStyle.Thick;

                //color
                Color celdasTitulos = System.Drawing.ColorTranslator.FromHtml("#bfbfbf");
                workSheet.Cells["B16:G16"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                workSheet.Cells["B16:G16"].Style.Fill.BackgroundColor.SetColor(celdasTitulos);

                //estilo de la fuente
                workSheet.Cells["B16:B10000"].Style.Font.Size = 11;
                workSheet.Cells["B16:B10000"].Style.Font.Name = "Calibri";
                workSheet.Cells["C16:C10000"].Style.Font.Size = 11;
                workSheet.Cells["C16:C10000"].Style.Font.Name = "Calibri";
                workSheet.Cells["D16:D10000"].Style.Font.Size = 11;
                workSheet.Cells["D16:D10000"].Style.Font.Name = "Calibri";
                workSheet.Cells["E16:E10000"].Style.Font.Size = 11;
                workSheet.Cells["E16:E10000"].Style.Font.Name = "Calibri";
                workSheet.Cells["F16:F10000"].Style.Font.Size = 11;
                workSheet.Cells["F16:F10000"].Style.Font.Name = "Calibri";
                workSheet.Cells["G16:G10000"].Style.Font.Size = 11;
                workSheet.Cells["G16:G10000"].Style.Font.Name = "Calibri";

                //make the borders of columnas
                workSheet.Cells["B17:B10000"].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                workSheet.Cells["B17:B10000"].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                workSheet.Cells["B17:B10000"].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                workSheet.Cells["B17:B10000"].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                workSheet.Cells["C17:C10000"].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                workSheet.Cells["C17:C10000"].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                workSheet.Cells["C17:C10000"].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                workSheet.Cells["C17:C10000"].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                workSheet.Cells["D17:D10000"].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                workSheet.Cells["D17:D10000"].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                workSheet.Cells["D17:D10000"].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                workSheet.Cells["D17:D10000"].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                workSheet.Cells["E17:E10000"].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                workSheet.Cells["E17:E10000"].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                workSheet.Cells["E17:E10000"].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                workSheet.Cells["E17:E10000"].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                workSheet.Cells["F17:F10000"].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                workSheet.Cells["F17:F10000"].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                workSheet.Cells["F17:F10000"].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                workSheet.Cells["F17:F10000"].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                workSheet.Cells["G17:G10000"].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                workSheet.Cells["G17:G10000"].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                workSheet.Cells["G17:G10000"].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                workSheet.Cells["G17:G10000"].Style.Border.Right.Style = ExcelBorderStyle.Thin;

                //establece el color en formato Hex
                Color celdasDatos = System.Drawing.ColorTranslator.FromHtml("#f2f2f2");
                workSheet.Cells["B17:B10000"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                workSheet.Cells["B17:B10000"].Style.Fill.BackgroundColor.SetColor(celdasDatos);
                workSheet.Cells["C17:C10000"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                workSheet.Cells["C17:C10000"].Style.Fill.BackgroundColor.SetColor(celdasDatos);
                workSheet.Cells["D17:D10000"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                workSheet.Cells["D17:D10000"].Style.Fill.BackgroundColor.SetColor(celdasDatos);
                workSheet.Cells["E17:E10000"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                workSheet.Cells["E17:E10000"].Style.Fill.BackgroundColor.SetColor(celdasDatos);
                workSheet.Cells["F17:F10000"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                workSheet.Cells["F17:F10000"].Style.Fill.BackgroundColor.SetColor(celdasDatos);
                workSheet.Cells["G17:G10000"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                workSheet.Cells["G17:G10000"].Style.Fill.BackgroundColor.SetColor(celdasDatos);

                //Salva el archivo
                package.Save();

            }

            stream.Position = 0;
            string excelName = $"Conciliaciones-{DateTime.Now.ToString("yyyy-MM-dd-HH:mm:ss")}.xlsx"; //NOMBRE QUE SE LE DA AL ARCHIVO DE EXCEL
            return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", excelName); //DEVUELVE EL ARCHIVO PARA GUARDAR
        }

    }
}