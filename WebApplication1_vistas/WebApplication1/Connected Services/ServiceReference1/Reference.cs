﻿//------------------------------------------------------------------------------
// <auto-generated>
//     Este código fue generado por una herramienta.
//
//     Los cambios en este archivo podrían causar un comportamiento incorrecto y se perderán si
//     se vuelve a generar el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ServiceReference1
{
    using System.Runtime.Serialization;
    
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    [System.Runtime.Serialization.DataContractAttribute(Name="TResponse", Namespace="http://tempuri.org/")]
    public partial class TResponse : object
    {
        
        private long transaction_idField;
        
        private int rcodeField;
        
        private string rcode_descriptionField;
        
        private string op_accountField;
        
        private string op_authorizationField;
        
        [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true)]
        public long transaction_id
        {
            get
            {
                return this.transaction_idField;
            }
            set
            {
                this.transaction_idField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=1)]
        public int rcode
        {
            get
            {
                return this.rcodeField;
            }
            set
            {
                this.rcodeField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=2)]
        public string rcode_description
        {
            get
            {
                return this.rcode_descriptionField;
            }
            set
            {
                this.rcode_descriptionField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=3)]
        public string op_account
        {
            get
            {
                return this.op_accountField;
            }
            set
            {
                this.op_accountField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=4)]
        public string op_authorization
        {
            get
            {
                return this.op_authorizationField;
            }
            set
            {
                this.op_authorizationField = value;
            }
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    [System.Runtime.Serialization.DataContractAttribute(Name="CkeckSkuResponse", Namespace="http://tempuri.org/")]
    public partial class CkeckSkuResponse : object
    {
        
        private int rcodeField;
        
        private float montoField;
        
        private string mensajeField;
        
        [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true)]
        public int rcode
        {
            get
            {
                return this.rcodeField;
            }
            set
            {
                this.rcodeField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=1)]
        public float monto
        {
            get
            {
                return this.montoField;
            }
            set
            {
                this.montoField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=2)]
        public string mensaje
        {
            get
            {
                return this.mensajeField;
            }
            set
            {
                this.mensajeField = value;
            }
        }
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="ServiceReference1.transactSoap")]
    public interface transactSoap
    {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/GetTRequestID", ReplyAction="*")]
        System.Threading.Tasks.Task<ServiceReference1.GetTRequestIDResponse> GetTRequestIDAsync(ServiceReference1.GetTRequestIDRequest request);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/CheckTransaction", ReplyAction="*")]
        System.Threading.Tasks.Task<ServiceReference1.CheckTransactionResponse> CheckTransactionAsync(ServiceReference1.CheckTransactionRequest request);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/DoT", ReplyAction="*")]
        System.Threading.Tasks.Task<ServiceReference1.DoTResponse> DoTAsync(ServiceReference1.DoTRequest request);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/GetSkuList", ReplyAction="*")]
        System.Threading.Tasks.Task<ServiceReference1.GetSkuListResponse> GetSkuListAsync(ServiceReference1.GetSkuListRequest request);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/GetBalance", ReplyAction="*")]
        System.Threading.Tasks.Task<ServiceReference1.GetBalanceResponse> GetBalanceAsync(ServiceReference1.GetBalanceRequest request);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/CheckSku", ReplyAction="*")]
        System.Threading.Tasks.Task<ServiceReference1.CheckSkuResponse> CheckSkuAsync(ServiceReference1.CheckSkuRequest request);
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(IsWrapped=false)]
    public partial class GetTRequestIDRequest
    {
        
        [System.ServiceModel.MessageBodyMemberAttribute(Name="GetTRequestID", Namespace="http://tempuri.org/", Order=0)]
        public ServiceReference1.GetTRequestIDRequestBody Body;
        
        public GetTRequestIDRequest()
        {
        }
        
        public GetTRequestIDRequest(ServiceReference1.GetTRequestIDRequestBody Body)
        {
            this.Body = Body;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.Runtime.Serialization.DataContractAttribute(Namespace="http://tempuri.org/")]
    public partial class GetTRequestIDRequestBody
    {
        
        [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=0)]
        public string username;
        
        [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=1)]
        public string password;
        
        [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=2)]
        public string licence;
        
        public GetTRequestIDRequestBody()
        {
        }
        
        public GetTRequestIDRequestBody(string username, string password, string licence)
        {
            this.username = username;
            this.password = password;
            this.licence = licence;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(IsWrapped=false)]
    public partial class GetTRequestIDResponse
    {
        
        [System.ServiceModel.MessageBodyMemberAttribute(Name="GetTRequestIDResponse", Namespace="http://tempuri.org/", Order=0)]
        public ServiceReference1.GetTRequestIDResponseBody Body;
        
        public GetTRequestIDResponse()
        {
        }
        
        public GetTRequestIDResponse(ServiceReference1.GetTRequestIDResponseBody Body)
        {
            this.Body = Body;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.Runtime.Serialization.DataContractAttribute(Namespace="http://tempuri.org/")]
    public partial class GetTRequestIDResponseBody
    {
        
        [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=0)]
        public string GetTRequestIDResult;
        
        public GetTRequestIDResponseBody()
        {
        }
        
        public GetTRequestIDResponseBody(string GetTRequestIDResult)
        {
            this.GetTRequestIDResult = GetTRequestIDResult;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(IsWrapped=false)]
    public partial class CheckTransactionRequest
    {
        
        [System.ServiceModel.MessageBodyMemberAttribute(Name="CheckTransaction", Namespace="http://tempuri.org/", Order=0)]
        public ServiceReference1.CheckTransactionRequestBody Body;
        
        public CheckTransactionRequest()
        {
        }
        
        public CheckTransactionRequest(ServiceReference1.CheckTransactionRequestBody Body)
        {
            this.Body = Body;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.Runtime.Serialization.DataContractAttribute(Namespace="http://tempuri.org/")]
    public partial class CheckTransactionRequestBody
    {
        
        [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=0)]
        public string TRequestID;
        
        [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=1)]
        public string username;
        
        public CheckTransactionRequestBody()
        {
        }
        
        public CheckTransactionRequestBody(string TRequestID, string username)
        {
            this.TRequestID = TRequestID;
            this.username = username;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(IsWrapped=false)]
    public partial class CheckTransactionResponse
    {
        
        [System.ServiceModel.MessageBodyMemberAttribute(Name="CheckTransactionResponse", Namespace="http://tempuri.org/", Order=0)]
        public ServiceReference1.CheckTransactionResponseBody Body;
        
        public CheckTransactionResponse()
        {
        }
        
        public CheckTransactionResponse(ServiceReference1.CheckTransactionResponseBody Body)
        {
            this.Body = Body;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.Runtime.Serialization.DataContractAttribute(Namespace="http://tempuri.org/")]
    public partial class CheckTransactionResponseBody
    {
        
        [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=0)]
        public ServiceReference1.TResponse CheckTransactionResult;
        
        public CheckTransactionResponseBody()
        {
        }
        
        public CheckTransactionResponseBody(ServiceReference1.TResponse CheckTransactionResult)
        {
            this.CheckTransactionResult = CheckTransactionResult;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(IsWrapped=false)]
    public partial class DoTRequest
    {
        
        [System.ServiceModel.MessageBodyMemberAttribute(Name="DoT", Namespace="http://tempuri.org/", Order=0)]
        public ServiceReference1.DoTRequestBody Body;
        
        public DoTRequest()
        {
        }
        
        public DoTRequest(ServiceReference1.DoTRequestBody Body)
        {
            this.Body = Body;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.Runtime.Serialization.DataContractAttribute(Namespace="http://tempuri.org/")]
    public partial class DoTRequestBody
    {
        
        [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=0)]
        public string TRequestID;
        
        [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=1)]
        public string username;
        
        [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=2)]
        public string skuCode;
        
        [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=3)]
        public string op_account;
        
        [System.Runtime.Serialization.DataMemberAttribute(Order=4)]
        public float monto;
        
        [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=5)]
        public string pv;
        
        [System.Runtime.Serialization.DataMemberAttribute(Order=6)]
        public float latitude;
        
        [System.Runtime.Serialization.DataMemberAttribute(Order=7)]
        public float longitude;
        
        public DoTRequestBody()
        {
        }
        
        public DoTRequestBody(string TRequestID, string username, string skuCode, string op_account, float monto, string pv, float latitude, float longitude)
        {
            this.TRequestID = TRequestID;
            this.username = username;
            this.skuCode = skuCode;
            this.op_account = op_account;
            this.monto = monto;
            this.pv = pv;
            this.latitude = latitude;
            this.longitude = longitude;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(IsWrapped=false)]
    public partial class DoTResponse
    {
        
        [System.ServiceModel.MessageBodyMemberAttribute(Name="DoTResponse", Namespace="http://tempuri.org/", Order=0)]
        public ServiceReference1.DoTResponseBody Body;
        
        public DoTResponse()
        {
        }
        
        public DoTResponse(ServiceReference1.DoTResponseBody Body)
        {
            this.Body = Body;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.Runtime.Serialization.DataContractAttribute(Namespace="http://tempuri.org/")]
    public partial class DoTResponseBody
    {
        
        [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=0)]
        public ServiceReference1.TResponse DoTResult;
        
        public DoTResponseBody()
        {
        }
        
        public DoTResponseBody(ServiceReference1.TResponse DoTResult)
        {
            this.DoTResult = DoTResult;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(IsWrapped=false)]
    public partial class GetSkuListRequest
    {
        
        [System.ServiceModel.MessageBodyMemberAttribute(Name="GetSkuList", Namespace="http://tempuri.org/", Order=0)]
        public ServiceReference1.GetSkuListRequestBody Body;
        
        public GetSkuListRequest()
        {
        }
        
        public GetSkuListRequest(ServiceReference1.GetSkuListRequestBody Body)
        {
            this.Body = Body;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.Runtime.Serialization.DataContractAttribute(Namespace="http://tempuri.org/")]
    public partial class GetSkuListRequestBody
    {
        
        [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=0)]
        public string username;
        
        [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=1)]
        public string password;
        
        public GetSkuListRequestBody()
        {
        }
        
        public GetSkuListRequestBody(string username, string password)
        {
            this.username = username;
            this.password = password;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(IsWrapped=false)]
    public partial class GetSkuListResponse
    {
        
        [System.ServiceModel.MessageBodyMemberAttribute(Name="GetSkuListResponse", Namespace="http://tempuri.org/", Order=0)]
        public ServiceReference1.GetSkuListResponseBody Body;
        
        public GetSkuListResponse()
        {
        }
        
        public GetSkuListResponse(ServiceReference1.GetSkuListResponseBody Body)
        {
            this.Body = Body;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.Runtime.Serialization.DataContractAttribute(Namespace="http://tempuri.org/")]
    public partial class GetSkuListResponseBody
    {
        
        [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=0)]
        public string GetSkuListResult;
        
        public GetSkuListResponseBody()
        {
        }
        
        public GetSkuListResponseBody(string GetSkuListResult)
        {
            this.GetSkuListResult = GetSkuListResult;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(IsWrapped=false)]
    public partial class GetBalanceRequest
    {
        
        [System.ServiceModel.MessageBodyMemberAttribute(Name="GetBalance", Namespace="http://tempuri.org/", Order=0)]
        public ServiceReference1.GetBalanceRequestBody Body;
        
        public GetBalanceRequest()
        {
        }
        
        public GetBalanceRequest(ServiceReference1.GetBalanceRequestBody Body)
        {
            this.Body = Body;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.Runtime.Serialization.DataContractAttribute(Namespace="http://tempuri.org/")]
    public partial class GetBalanceRequestBody
    {
        
        [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=0)]
        public string username;
        
        [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=1)]
        public string password;
        
        public GetBalanceRequestBody()
        {
        }
        
        public GetBalanceRequestBody(string username, string password)
        {
            this.username = username;
            this.password = password;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(IsWrapped=false)]
    public partial class GetBalanceResponse
    {
        
        [System.ServiceModel.MessageBodyMemberAttribute(Name="GetBalanceResponse", Namespace="http://tempuri.org/", Order=0)]
        public ServiceReference1.GetBalanceResponseBody Body;
        
        public GetBalanceResponse()
        {
        }
        
        public GetBalanceResponse(ServiceReference1.GetBalanceResponseBody Body)
        {
            this.Body = Body;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.Runtime.Serialization.DataContractAttribute(Namespace="http://tempuri.org/")]
    public partial class GetBalanceResponseBody
    {
        
        [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=0)]
        public string GetBalanceResult;
        
        public GetBalanceResponseBody()
        {
        }
        
        public GetBalanceResponseBody(string GetBalanceResult)
        {
            this.GetBalanceResult = GetBalanceResult;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(IsWrapped=false)]
    public partial class CheckSkuRequest
    {
        
        [System.ServiceModel.MessageBodyMemberAttribute(Name="CheckSku", Namespace="http://tempuri.org/", Order=0)]
        public ServiceReference1.CheckSkuRequestBody Body;
        
        public CheckSkuRequest()
        {
        }
        
        public CheckSkuRequest(ServiceReference1.CheckSkuRequestBody Body)
        {
            this.Body = Body;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.Runtime.Serialization.DataContractAttribute(Namespace="http://tempuri.org/")]
    public partial class CheckSkuRequestBody
    {
        
        [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=0)]
        public string username;
        
        [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=1)]
        public string password;
        
        [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=2)]
        public string referencia;
        
        [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=3)]
        public string sku;
        
        public CheckSkuRequestBody()
        {
        }
        
        public CheckSkuRequestBody(string username, string password, string referencia, string sku)
        {
            this.username = username;
            this.password = password;
            this.referencia = referencia;
            this.sku = sku;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(IsWrapped=false)]
    public partial class CheckSkuResponse
    {
        
        [System.ServiceModel.MessageBodyMemberAttribute(Name="CheckSkuResponse", Namespace="http://tempuri.org/", Order=0)]
        public ServiceReference1.CheckSkuResponseBody Body;
        
        public CheckSkuResponse()
        {
        }
        
        public CheckSkuResponse(ServiceReference1.CheckSkuResponseBody Body)
        {
            this.Body = Body;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.Runtime.Serialization.DataContractAttribute(Namespace="http://tempuri.org/")]
    public partial class CheckSkuResponseBody
    {
        
        [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=0)]
        public ServiceReference1.CkeckSkuResponse CheckSkuResult;
        
        public CheckSkuResponseBody()
        {
        }
        
        public CheckSkuResponseBody(ServiceReference1.CkeckSkuResponse CheckSkuResult)
        {
            this.CheckSkuResult = CheckSkuResult;
        }
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    public interface transactSoapChannel : ServiceReference1.transactSoap, System.ServiceModel.IClientChannel
    {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    public partial class transactSoapClient : System.ServiceModel.ClientBase<ServiceReference1.transactSoap>, ServiceReference1.transactSoap
    {
        
        /// <summary>
        /// Implemente este método parcial para configurar el punto de conexión de servicio.
        /// </summary>
        /// <param name="serviceEndpoint">El punto de conexión para configurar</param>
        /// <param name="clientCredentials">Credenciales de cliente</param>
        static partial void ConfigureEndpoint(System.ServiceModel.Description.ServiceEndpoint serviceEndpoint, System.ServiceModel.Description.ClientCredentials clientCredentials);
        
        public transactSoapClient(EndpointConfiguration endpointConfiguration) : 
                base(transactSoapClient.GetBindingForEndpoint(endpointConfiguration), transactSoapClient.GetEndpointAddress(endpointConfiguration))
        {
            this.Endpoint.Name = endpointConfiguration.ToString();
            ConfigureEndpoint(this.Endpoint, this.ClientCredentials);
        }
        
        public transactSoapClient(EndpointConfiguration endpointConfiguration, string remoteAddress) : 
                base(transactSoapClient.GetBindingForEndpoint(endpointConfiguration), new System.ServiceModel.EndpointAddress(remoteAddress))
        {
            this.Endpoint.Name = endpointConfiguration.ToString();
            ConfigureEndpoint(this.Endpoint, this.ClientCredentials);
        }
        
        public transactSoapClient(EndpointConfiguration endpointConfiguration, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(transactSoapClient.GetBindingForEndpoint(endpointConfiguration), remoteAddress)
        {
            this.Endpoint.Name = endpointConfiguration.ToString();
            ConfigureEndpoint(this.Endpoint, this.ClientCredentials);
        }
        
        public transactSoapClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress)
        {
        }
        
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        System.Threading.Tasks.Task<ServiceReference1.GetTRequestIDResponse> ServiceReference1.transactSoap.GetTRequestIDAsync(ServiceReference1.GetTRequestIDRequest request)
        {
            return base.Channel.GetTRequestIDAsync(request);
        }
        
        public System.Threading.Tasks.Task<ServiceReference1.GetTRequestIDResponse> GetTRequestIDAsync(string username, string password, string licence)
        {
            ServiceReference1.GetTRequestIDRequest inValue = new ServiceReference1.GetTRequestIDRequest();
            inValue.Body = new ServiceReference1.GetTRequestIDRequestBody();
            inValue.Body.username = username;
            inValue.Body.password = password;
            inValue.Body.licence = licence;
            return ((ServiceReference1.transactSoap)(this)).GetTRequestIDAsync(inValue);
        }
        
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        System.Threading.Tasks.Task<ServiceReference1.CheckTransactionResponse> ServiceReference1.transactSoap.CheckTransactionAsync(ServiceReference1.CheckTransactionRequest request)
        {
            return base.Channel.CheckTransactionAsync(request);
        }
        
        public System.Threading.Tasks.Task<ServiceReference1.CheckTransactionResponse> CheckTransactionAsync(string TRequestID, string username)
        {
            ServiceReference1.CheckTransactionRequest inValue = new ServiceReference1.CheckTransactionRequest();
            inValue.Body = new ServiceReference1.CheckTransactionRequestBody();
            inValue.Body.TRequestID = TRequestID;
            inValue.Body.username = username;
            return ((ServiceReference1.transactSoap)(this)).CheckTransactionAsync(inValue);
        }
        
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        System.Threading.Tasks.Task<ServiceReference1.DoTResponse> ServiceReference1.transactSoap.DoTAsync(ServiceReference1.DoTRequest request)
        {
            return base.Channel.DoTAsync(request);
        }
        
        public System.Threading.Tasks.Task<ServiceReference1.DoTResponse> DoTAsync(string TRequestID, string username, string skuCode, string op_account, float monto, string pv, float latitude, float longitude)
        {
            ServiceReference1.DoTRequest inValue = new ServiceReference1.DoTRequest();
            inValue.Body = new ServiceReference1.DoTRequestBody();
            inValue.Body.TRequestID = TRequestID;
            inValue.Body.username = username;
            inValue.Body.skuCode = skuCode;
            inValue.Body.op_account = op_account;
            inValue.Body.monto = monto;
            inValue.Body.pv = pv;
            inValue.Body.latitude = latitude;
            inValue.Body.longitude = longitude;
            return ((ServiceReference1.transactSoap)(this)).DoTAsync(inValue);
        }
        
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        System.Threading.Tasks.Task<ServiceReference1.GetSkuListResponse> ServiceReference1.transactSoap.GetSkuListAsync(ServiceReference1.GetSkuListRequest request)
        {
            return base.Channel.GetSkuListAsync(request);
        }
        
        public System.Threading.Tasks.Task<ServiceReference1.GetSkuListResponse> GetSkuListAsync(string username, string password)
        {
            ServiceReference1.GetSkuListRequest inValue = new ServiceReference1.GetSkuListRequest();
            inValue.Body = new ServiceReference1.GetSkuListRequestBody();
            inValue.Body.username = username;
            inValue.Body.password = password;
            return ((ServiceReference1.transactSoap)(this)).GetSkuListAsync(inValue);
        }
        
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        System.Threading.Tasks.Task<ServiceReference1.GetBalanceResponse> ServiceReference1.transactSoap.GetBalanceAsync(ServiceReference1.GetBalanceRequest request)
        {
            return base.Channel.GetBalanceAsync(request);
        }
        
        public System.Threading.Tasks.Task<ServiceReference1.GetBalanceResponse> GetBalanceAsync(string username, string password)
        {
            ServiceReference1.GetBalanceRequest inValue = new ServiceReference1.GetBalanceRequest();
            inValue.Body = new ServiceReference1.GetBalanceRequestBody();
            inValue.Body.username = username;
            inValue.Body.password = password;
            return ((ServiceReference1.transactSoap)(this)).GetBalanceAsync(inValue);
        }
        
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        System.Threading.Tasks.Task<ServiceReference1.CheckSkuResponse> ServiceReference1.transactSoap.CheckSkuAsync(ServiceReference1.CheckSkuRequest request)
        {
            return base.Channel.CheckSkuAsync(request);
        }
        
        public System.Threading.Tasks.Task<ServiceReference1.CheckSkuResponse> CheckSkuAsync(string username, string password, string referencia, string sku)
        {
            ServiceReference1.CheckSkuRequest inValue = new ServiceReference1.CheckSkuRequest();
            inValue.Body = new ServiceReference1.CheckSkuRequestBody();
            inValue.Body.username = username;
            inValue.Body.password = password;
            inValue.Body.referencia = referencia;
            inValue.Body.sku = sku;
            return ((ServiceReference1.transactSoap)(this)).CheckSkuAsync(inValue);
        }
        
        public virtual System.Threading.Tasks.Task OpenAsync()
        {
            return System.Threading.Tasks.Task.Factory.FromAsync(((System.ServiceModel.ICommunicationObject)(this)).BeginOpen(null, null), new System.Action<System.IAsyncResult>(((System.ServiceModel.ICommunicationObject)(this)).EndOpen));
        }
        
        public virtual System.Threading.Tasks.Task CloseAsync()
        {
            return System.Threading.Tasks.Task.Factory.FromAsync(((System.ServiceModel.ICommunicationObject)(this)).BeginClose(null, null), new System.Action<System.IAsyncResult>(((System.ServiceModel.ICommunicationObject)(this)).EndClose));
        }
        
        private static System.ServiceModel.Channels.Binding GetBindingForEndpoint(EndpointConfiguration endpointConfiguration)
        {
            if ((endpointConfiguration == EndpointConfiguration.transactSoap))
            {
                System.ServiceModel.BasicHttpBinding result = new System.ServiceModel.BasicHttpBinding();
                result.MaxBufferSize = int.MaxValue;
                result.ReaderQuotas = System.Xml.XmlDictionaryReaderQuotas.Max;
                result.MaxReceivedMessageSize = int.MaxValue;
                result.AllowCookies = true;
                return result;
            }
            if ((endpointConfiguration == EndpointConfiguration.transactSoap12))
            {
                System.ServiceModel.Channels.CustomBinding result = new System.ServiceModel.Channels.CustomBinding();
                System.ServiceModel.Channels.TextMessageEncodingBindingElement textBindingElement = new System.ServiceModel.Channels.TextMessageEncodingBindingElement();
                textBindingElement.MessageVersion = System.ServiceModel.Channels.MessageVersion.CreateVersion(System.ServiceModel.EnvelopeVersion.Soap12, System.ServiceModel.Channels.AddressingVersion.None);
                result.Elements.Add(textBindingElement);
                System.ServiceModel.Channels.HttpTransportBindingElement httpBindingElement = new System.ServiceModel.Channels.HttpTransportBindingElement();
                httpBindingElement.AllowCookies = true;
                httpBindingElement.MaxBufferSize = int.MaxValue;
                httpBindingElement.MaxReceivedMessageSize = int.MaxValue;
                result.Elements.Add(httpBindingElement);
                return result;
            }
            throw new System.InvalidOperationException(string.Format("No se pudo encontrar un punto de conexión con el nombre \"{0}\".", endpointConfiguration));
        }
        
        private static System.ServiceModel.EndpointAddress GetEndpointAddress(EndpointConfiguration endpointConfiguration)
        {
            if ((endpointConfiguration == EndpointConfiguration.transactSoap))
            {
                return new System.ServiceModel.EndpointAddress("http://187.217.102.146/pagaqui/transact.asmx");
            }
            if ((endpointConfiguration == EndpointConfiguration.transactSoap12))
            {
                return new System.ServiceModel.EndpointAddress("http://187.217.102.146/pagaqui/transact.asmx");
            }
            throw new System.InvalidOperationException(string.Format("No se pudo encontrar un punto de conexión con el nombre \"{0}\".", endpointConfiguration));
        }
        
        public enum EndpointConfiguration
        {
            
            transactSoap,
            
            transactSoap12,
        }
    }
}