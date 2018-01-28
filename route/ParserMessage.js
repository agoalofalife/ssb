
module.exports = class ParserMessage{
    /**
     *
     * @param schema
     * @param response response from slack
     * @param parent link to parent class
     * @param baseObject
     */
  constructor(schema, response, parent = null, baseObject = null) {
      if (Array.isArray(schema) === false) throw new SyntaxError('Expected first argument is array type!');
        this.currentRoute = schema;
        this.parent = parent;
        this.responseSlack = response;
        this.baseObject = baseObject;
  }

/**
 *
 * @return {*}
 */
  run() {
      for (let i = 0; i < this.currentRoute.length; i++) {
          let objectSchema = this.currentRoute[i];

          if (Array.isArray(objectSchema.routes) && objectSchema.routes.length > 0 && objectSchema.class.route(this.responseSlack)) {
              // todo in class type message in constructor pass responseSlack and baseObject
              return (new ParserMessage(objectSchema.routes, this.responseSlack, new objectSchema.class(this.responseSlack, this.baseObject), this.baseObject)).run();
          } else{
              if(Array.isArray(objectSchema.routes) && objectSchema.routes.length === 0 && objectSchema.class.route(this.responseSlack)) {
                  return new objectSchema.class(this.responseSlack, this.baseObject);
              }
          }
      }
      return this.parent;
  }
};