import nodejs from "@/assets/logos/nodejs-logo.svg";
import python from "@/assets/logos/python.png";
import php from "@/assets/logos/php-logo.svg";
import java from "@/assets/logos/Java.svg";
import postman from "@/assets/logos/postman.svg";
import swagger from "@/assets/logos/Swagger.svg";
import sap from "@/assets/logos/sap.svg";
import oracle from "@/assets/logos/oracle.svg";
import dynamics365 from "@/assets/logos/Dynamics365_scalable.svg";
import tally from "@/assets/logos/tally.svg";
import odoo from "@/assets/logos/odoo.svg";
import razorpay from "@/assets/logos/razorpay.svg";
import marg from "@/assets/logos/marg-the-business-backbone-logo.png";
import sbi from "@/assets/logos/sbi.png";
import wheelseye from "@/assets/logos/wheelseye.svg";
import pharmeasy from "@/assets/logos/pharmeasy.svg";
import dotnet from "@/assets/logos/dot-net-logo.png";
import ruby from "@/assets/logos/ruby.png"
// import Elixir from "@/assets/logos/elixir-logo.png";
// import springboot from "@/assets/logos/spring-boot.png"
// import gin from "@/assets/logos/gin.png";
// import laravel from "@/assets/logos/laravel.svg";
// import fastApi from "@/assets/logos/fastapi.png";
// import express from "@/assets/logos/express.svg";
import go from "@/assets/logos/go-logo.png"
// import django from "@/assets/logos/django.png"

/**
 * Maps an integration-logo label (as used in `IntegrationSection.logos`) to its
 * brand asset in `src/assets/logos/`. Labels without an asset here fall back to
 * the placeholder icon in the orbit node.
 */
export const LOGO_ASSETS: Record<string, string> = {
  "Node.js": nodejs,
  Python: python,
  PHP: php,
  Java: java,
  Postman: postman,
  "OpenAPI 3.1": swagger,
  "SAP S/4HANA": sap,
  "SAP ECC": sap,
  "SAP S/4HANA KSA": sap,
  "Oracle NetSuite": oracle,
  "Oracle NetSuite KSA": oracle,
  "Microsoft Dynamics 365": dynamics365,
  "Tally Prime": tally,
  Odoo: odoo,
  "Razorpay X": razorpay,
  Marg: marg,
  SBI: sbi,
  WheelsEye: wheelseye,
  Pharmeasy: pharmeasy,
  ".NET": dotnet,
  Ruby: ruby,

  // Elixir: Elixir,
  // "Spring Boot": springboot,
  // Gin: gin,
  // Laravel: laravel,
  // FastAPI: fastApi,
  // Express: express,
  Go: go,
  // Django: django,
};

export function getLogoAsset(label: string): string | undefined {
  return LOGO_ASSETS[label];
}
