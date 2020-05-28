using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using RecargasElectronicas.Models.DBF;

namespace RecargasElectronicas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AspNetUsersController : ControllerBase
    {

        
            private readonly IHostingEnvironment _hostingEnvironment;
            private readonly bdRecargas2Context _db;

            public AspNetUsersController(IHostingEnvironment hostingEnvironment, bdRecargas2Context db)
            {
                _hostingEnvironment = hostingEnvironment;
                _db = db;
            }

        //api/AspNetUsers/ExportCustomer
        [HttpGet]
            [Route("ExportCustomer")]
            public string ExportCustomer()
            {
                string rootFolder = _hostingEnvironment.WebRootPath;
                string fileName = @"ExportCustomers.xlsx";

                FileInfo file = new FileInfo(Path.Combine(rootFolder, fileName));

                using (ExcelPackage package = new ExcelPackage(file))
                {

                    IList<AspNetUsers> customerList = _db.AspNetUsers.ToList();

                    ExcelWorksheet worksheet = package.Workbook.Worksheets.Add("Usuarios");
                    int totalRows = customerList.Count();

                    worksheet.Cells[1, 1].Value = "Customer ID";
                    worksheet.Cells[1, 2].Value = "Customer UserName";
                    worksheet.Cells[1, 3].Value = "Customer Email";
                    int i = 0;
                    for (int row = 2; row <= totalRows + 1; row++)
                    {
                        worksheet.Cells[row, 1].Value = customerList[i].IntId;
                        worksheet.Cells[row, 2].Value = customerList[i].UserName;
                        worksheet.Cells[row, 3].Value = customerList[i].Email;
                        i++;
                    }

                    package.Save();

                }

                return " Customer list has been exported successfully";

            }


        //api/AspNetUsers/Export1
        [HttpGet("Export1")]
        public async Task<IActionResult> Export1(CancellationToken cancellationToken)
        //public string ExportCustomer()
        {
                await Task.Yield();

                IList<AspNetUsers> customerList = _db.AspNetUsers.ToList();

                var stream = new MemoryStream();
                using (var package = new ExcelPackage(stream))
                {
                    var workSheet = package.Workbook.Worksheets.Add("Hoja1");
                    workSheet.Cells.LoadFromCollection(customerList, true);
                    package.Save();
                


                //ExcelWorksheet worksheet = package.Workbook.Worksheets.Add("Usuarios");
                int totalRows = customerList.Count();

                workSheet.Cells[1, 1].Value = "Customer ID";
                workSheet.Cells[1, 2].Value = "Customer UserName";
                workSheet.Cells[1, 3].Value = "Customer Email";
                int i = 0;
                for (int row = 2; row <= totalRows + 1; row++)
                {
                    workSheet.Cells[row, 1].Value = customerList[i].IntId;
                    workSheet.Cells[row, 2].Value = customerList[i].UserName;
                    workSheet.Cells[row, 3].Value = customerList[i].Email;
                    i++;
                }
                }

            stream.Position = 0;
            string excelName = $"Prueba-{DateTime.Now.ToString("yyyyMMddHHmmssfff")}.xlsx";
            return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", excelName);
        }
    }
}