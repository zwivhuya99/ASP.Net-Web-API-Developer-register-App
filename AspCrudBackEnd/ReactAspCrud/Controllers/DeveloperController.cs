//using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactAspCrud.Models;

namespace ReactAspCrud.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeveloperController : ControllerBase
    {
        private readonly DeveloperDbContext _developerDbContext;
        public DeveloperController(DeveloperDbContext developerDbContext)
        {
            _developerDbContext = developerDbContext;
        }

        [HttpGet]
        [Route("GetDeveloper")]
        //IEnumarable to enable iterations without knowing the actual collection type
        public async Task<IEnumerable<Developers>> GetDeveloper()
        {
            //creating a list of developers by enumarating asynchronously
            return await _developerDbContext.Developer.ToListAsync(); //return list of all devs
        }

        [HttpPost]
        [Route("AddDeveloper")]
        public async Task<Developers> AddDeveloper(Developers new_developer)
        {
            _developerDbContext.Developer.Add(new_developer);
            await _developerDbContext.SaveChangesAsync();
            return new_developer;
        }

        [HttpPatch]
        [Route("UpdateDeveloper/{Id}")]
        public async Task<Developers> UpdateDeveloper(Developers developer)
        {
            _developerDbContext.Entry(developer).State = EntityState.Modified;
            await _developerDbContext.SaveChangesAsync();
            return developer;
        }

        [HttpDelete]
        [Route("DeleteDeveloper/{Id}")]
        public bool DeleteDeveloper(int id)
        {
            bool id_exist = false;
            var developer = _developerDbContext.Developer.Find(id);
            if (developer != null) //id exist
            {
                 id_exist = true;
                _developerDbContext.Entry(developer).State = EntityState.Deleted;
                _developerDbContext.SaveChanges();
            }
            return id_exist;
        }

    }

}