
module.exports = class ParserMessage{
/**
 *
 * @param schema
 * @param response response from slack
 * @param parent link to parent class
 */
  constructor(schema, response, parent = null) {
      if (Array.isArray(schema) === false) throw new SyntaxError('Expected first argument is array type!');
        this.currentRoute = schema;
        this.parent = parent;
        this.responseSlack = response;
  }

/**
 *
 * @return {*}
 */
  run() {
      for (let i = 0; i <= this.currentRoute.length; i++) {
          let objectSchema = this.currentRoute[i];
          if (Array.isArray(objectSchema.routes) && objectSchema.routes.length > 0) {
              return (new ParserMessage(objectSchema.routes, this.responseSlack, this)).run()
          } else{
              if(objectSchema.class.route(this.responseSlack)) {
                  return new objectSchema.class();
              }
          }
      }
  }
};