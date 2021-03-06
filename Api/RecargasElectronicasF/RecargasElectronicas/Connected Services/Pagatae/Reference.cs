﻿//------------------------------------------------------------------------------
// <auto-generated>
//     Este código fue generado por una herramienta.
//
//     Los cambios en este archivo podrían causar un comportamiento incorrecto y se perderán si
//     se vuelve a generar el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Pagatae
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
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="Pagatae.transactSoap")]
    public interface transactSoap
    {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/GetTRequestID", ReplyAction="*")]
        System.Threading.Tasks.Task<Pagatae.GetTRequestIDResponse> GetTRequestIDAsync(Pagatae.GetTRequestIDRequest request);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/CheckTransaction", ReplyAction="*")]
        System.Threading.Tasks.Task<Pagatae.CheckTransactionResponse> CheckTransactionAsync(Pagatae.CheckTransactionRequest request);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/DoT", ReplyAction="*")]
        System.Threading.Tasks.Task<Pagatae.DoTResponse> DoTAsync(Pagatae.DoTRequest request);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/GetSkuList", ReplyAction="*")]
        System.Threading.Tasks.Task<Pagatae.GetSkuListResponse> GetSkuListAsync(Pagatae.GetSkuListRequest request);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/GetBalance", ReplyAction="*")]
        System.Threading.Tasks.Task<Pagatae.GetBalanceResponse> GetBalanceAsync(Pagatae.GetBalanceRequest request);
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(IsWrapped=false)]
    public partial class GetTRequestIDRequest
    {
        
        [System.ServiceModel.MessageBodyMemberAttribute(Name="GetTRequestID", Namespace="http://tempuri.org/", Order=0)]
        public Pagatae.GetTRequestIDRequestBody Body;
        
        public GetTRequestIDRequest()
        {
        }
        
        public GetTRequestIDRequest(Pagatae.GetTRequestIDRequestBody Body)
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
        public Pagatae.GetTRequestIDResponseBody Body;
        
        public GetTRequestIDResponse()
        {
        }
        
        public GetTRequestIDResponse(Pagatae.GetTRequestIDResponseBody Body)
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
        public Pagatae.CheckTransactionRequestBody Body;
        
        public CheckTransactionRequest()
        {
        }
        
        public CheckTransactionRequest(Pagatae.CheckTransactionRequestBody Body)
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
        public Pagatae.CheckTransactionResponseBody Body;
        
        public CheckTransactionResponse()
        {
        }
        
        public CheckTransactionResponse(Pagatae.CheckTransactionResponseBody Body)
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
        public Pagatae.TResponse CheckTransactionResult;
        
        public CheckTransactionResponseBody()
        {
        }
        
        public CheckTransactionResponseBody(Pagatae.TResponse CheckTransactionResult)
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
        public Pagatae.DoTRequestBody Body;
        
        public DoTRequest()
        {
        }
        
        public DoTRequest(Pagatae.DoTRequestBody Body)
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
        
        public DoTRequestBody()
        {
        }
        
        public DoTRequestBody(string TRequestID, string username, string skuCode, string op_account, float monto)
        {
            this.TRequestID = TRequestID;
            this.username = username;
            this.skuCode = skuCode;
            this.op_account = op_account;
            this.monto = monto;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(IsWrapped=false)]
    public partial class DoTResponse
    {
        
        [System.ServiceModel.MessageBodyMemberAttribute(Name="DoTResponse", Namespace="http://tempuri.org/", Order=0)]
        public Pagatae.DoTResponseBody Body;
        
        public DoTResponse()
        {
        }
        
        public DoTResponse(Pagatae.DoTResponseBody Body)
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
        public Pagatae.TResponse DoTResult;
        
        public DoTResponseBody()
        {
        }
        
        public DoTResponseBody(Pagatae.TResponse DoTResult)
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
        public Pagatae.GetSkuListRequestBody Body;
        
        public GetSkuListRequest()
        {
        }
        
        public GetSkuListRequest(Pagatae.GetSkuListRequestBody Body)
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
        public Pagatae.GetSkuListResponseBody Body;
        
        public GetSkuListResponse()
        {
        }
        
        public GetSkuListResponse(Pagatae.GetSkuListResponseBody Body)
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
        public Pagatae.GetBalanceRequestBody Body;
        
        public GetBalanceRequest()
        {
        }
        
        public GetBalanceRequest(Pagatae.GetBalanceRequestBody Body)
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
        public Pagatae.GetBalanceResponseBody Body;
        
        public GetBalanceResponse()
        {
        }
        
        public GetBalanceResponse(Pagatae.GetBalanceResponseBody Body)
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
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    public interface transactSoapChannel : Pagatae.transactSoap, System.ServiceModel.IClientChannel
    {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    public partial class transactSoapClient : System.ServiceModel.ClientBase<Pagatae.transactSoap>, Pagatae.transactSoap
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
        System.Threading.Tasks.Task<Pagatae.GetTRequestIDResponse> Pagatae.transactSoap.GetTRequestIDAsync(Pagatae.GetTRequestIDRequest request)
        {
            return base.Channel.GetTRequestIDAsync(request);
        }
        
        public System.Threading.Tasks.Task<Pagatae.GetTRequestIDResponse> GetTRequestIDAsync(string username, string password, string licence)
        {
            Pagatae.GetTRequestIDRequest inValue = new Pagatae.GetTRequestIDRequest();
            inValue.Body = new Pagatae.GetTRequestIDRequestBody();
            inValue.Body.username = username;
            inValue.Body.password = password;
            inValue.Body.licence = licence;
            return ((Pagatae.transactSoap)(this)).GetTRequestIDAsync(inValue);
        }
        
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        System.Threading.Tasks.Task<Pagatae.CheckTransactionResponse> Pagatae.transactSoap.CheckTransactionAsync(Pagatae.CheckTransactionRequest request)
        {
            return base.Channel.CheckTransactionAsync(request);
        }
        
        public System.Threading.Tasks.Task<Pagatae.CheckTransactionResponse> CheckTransactionAsync(string TRequestID, string username)
        {
            Pagatae.CheckTransactionRequest inValue = new Pagatae.CheckTransactionRequest();
            inValue.Body = new Pagatae.CheckTransactionRequestBody();
            inValue.Body.TRequestID = TRequestID;
            inValue.Body.username = username;
            return ((Pagatae.transactSoap)(this)).CheckTransactionAsync(inValue);
        }
        
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        System.Threading.Tasks.Task<Pagatae.DoTResponse> Pagatae.transactSoap.DoTAsync(Pagatae.DoTRequest request)
        {
            return base.Channel.DoTAsync(request);
        }
        
        public System.Threading.Tasks.Task<Pagatae.DoTResponse> DoTAsync(string TRequestID, string username, string skuCode, string op_account, float monto)
        {
            Pagatae.DoTRequest inValue = new Pagatae.DoTRequest();
            inValue.Body = new Pagatae.DoTRequestBody();
            inValue.Body.TRequestID = TRequestID;
            inValue.Body.username = username;
            inValue.Body.skuCode = skuCode;
            inValue.Body.op_account = op_account;
            inValue.Body.monto = monto;
            return ((Pagatae.transactSoap)(this)).DoTAsync(inValue);
        }
        
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        System.Threading.Tasks.Task<Pagatae.GetSkuListResponse> Pagatae.transactSoap.GetSkuListAsync(Pagatae.GetSkuListRequest request)
        {
            return base.Channel.GetSkuListAsync(request);
        }
        
        public System.Threading.Tasks.Task<Pagatae.GetSkuListResponse> GetSkuListAsync(string username, string password)
        {
            Pagatae.GetSkuListRequest inValue = new Pagatae.GetSkuListRequest();
            inValue.Body = new Pagatae.GetSkuListRequestBody();
            inValue.Body.username = username;
            inValue.Body.password = password;
            return ((Pagatae.transactSoap)(this)).GetSkuListAsync(inValue);
        }
        
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        System.Threading.Tasks.Task<Pagatae.GetBalanceResponse> Pagatae.transactSoap.GetBalanceAsync(Pagatae.GetBalanceRequest request)
        {
            return base.Channel.GetBalanceAsync(request);
        }
        
        public System.Threading.Tasks.Task<Pagatae.GetBalanceResponse> GetBalanceAsync(string username, string password)
        {
            Pagatae.GetBalanceRequest inValue = new Pagatae.GetBalanceRequest();
            inValue.Body = new Pagatae.GetBalanceRequestBody();
            inValue.Body.username = username;
            inValue.Body.password = password;
            return ((Pagatae.transactSoap)(this)).GetBalanceAsync(inValue);
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
                return new System.ServiceModel.EndpointAddress("http://187.217.102.146/vtae/transact.asmx");
            }
            if ((endpointConfiguration == EndpointConfiguration.transactSoap12))
            {
                return new System.ServiceModel.EndpointAddress("http://187.217.102.146/vtae/transact.asmx");
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
