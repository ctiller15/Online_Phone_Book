using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Online_Phone_Book.Controllers
{
    [RoutePrefix("api/Contacts")]
    public class ContactsController : ApiController
    {
        [Authorize]
        [Route("")]
        public IHttpActionResult Get()
        {
            return Ok(Contact.CreateContacts());
        }
        
    }

    #region Helpers

    public class Contact
    {
        public int ContactID { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string PrefContMthd { get; set; }

        public static List<Contact> CreateContacts()
        {
            List<Contact> ContactList = new List<Contact>
            {
                new Contact {ContactID = 28, Name = "Mark", Address = "1234NotProformaAvenue", Email = "MarkDewey@DeweyDecimal.com", Phone = "813-867-5309", PrefContMthd = "Email"},
                new Contact {ContactID = 7, Name = "Chris", Address = "11500 Not where I live creepers", Email = "NotRealEmail@email.com", Phone = "813-999-5544", PrefContMthd = "Phone"},
                new Contact {ContactID = 17, Name = "Wes", Address = "11500 Exact same address Circle", Email = "At@At.com", Phone = "853-533-6644", PrefContMthd = "Email"},
                new Contact {ContactID = 50, Name = "Toni", Address = "9853 This is totally a real place st.", Email = "ToniLovesChihuahuas.com", Phone = "243-995-0394", PrefContMthd = "Phone"},
                new Contact {ContactID = 3, Name = "Jason", Address = "4800 is a cool number ln.", Email = "Isteppedindogcrap@crapwhyohwhy.dog", Phone = "112-342-1337", PrefContMthd = "Email"},
            };

            return ContactList;
        }
    }

    #endregion
}
