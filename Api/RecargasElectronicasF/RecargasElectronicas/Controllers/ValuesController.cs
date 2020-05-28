using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http.Cors;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RecargasElectronicas.Services;

namespace RecargasElectronicas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]    
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Authorize(Roles = "Admin")]
    public class ValuesController : ControllerBase
    {
        //private readonly HashService _hashService;

        // GET api/values
        [HttpGet]
        //[EnableCors(origins: "http://mywebclient.azurewebsites.net", headers: "*", methods: "*")]
        public ActionResult<IEnumerable<string>> Get()

        {
            return new string[] { "value10202", "value2" };
        }

        //Probar hash
        // GET api/values/5
        //[HttpGet("hash")]
        //public ActionResult GetHash()
        //{
        //    string textoplano = "Martin Quiahua";
        //    var hashResult1 = _hashService.Hash(textoplano).Hash;
        //    var hashResult2 = _hashService.Hash(textoplano).Hash;
        //    return Ok( new { textoplano, hashResult1, hashResult2});
        //}

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
